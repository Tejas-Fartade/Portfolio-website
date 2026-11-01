const assert = require("node:assert/strict");
const http = require("node:http");
const net = require("node:net");
const path = require("node:path");
const { before, after, test } = require("node:test");
const { gzipSync, deflateSync } = require("node:zlib");

let server;
let port;

before(async () => {
  const originalListen = net.Server.prototype.listen;
  const originalNodeEnv = process.env.NODE_ENV;
  let listening;

  // The application starts itself; isolate its listener without changing production code.
  net.Server.prototype.listen = function (...args) {
    server = this;
    listening = new Promise((resolve, reject) => {
      this.once("listening", resolve);
      this.once("error", reject);
    });
    const callback = args.at(-1);
    return originalListen.call(
      this,
      0,
      "127.0.0.1",
      typeof callback === "function" ? callback : undefined,
    );
  };

  try {
    process.env.NODE_ENV = "production";
    require(path.join(__dirname, "../dist/server.cjs"));
    assert.ok(server, "The built application must start its HTTP server");
  } finally {
    net.Server.prototype.listen = originalListen;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
  }

  await listening;
  port = server.address().port;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

function request(body, encoding) {
  const headers = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    headers["Content-Length"] = Buffer.byteLength(body);
  }
  if (encoding) headers["Content-Encoding"] = encoding;

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path: body === undefined ? "/api/health" : "/api/contact",
        method: body === undefined ? "GET" : "POST",
        headers,
        agent: false,
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("error", reject);
        res.on("end", () => resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString("utf8"),
        }));
      },
    );
    req.on("error", reject);
    req.setTimeout(5000, () => req.destroy(new Error("Local request timed out")));
    req.end(body);
  });
}

const contact = JSON.stringify({
  name: "Regression Test",
  email: "request-body@example.invalid",
  subject: "Synthetic local test",
  message: "Synthetic request body regression test.",
});

test("accepts valid uncompressed contact JSON", async () => {
  const response = await request(contact);
  assert.equal(response.status, 200);
  assert.equal(JSON.parse(response.body).success, true);
});

test("rejects malformed uncompressed JSON", async () => {
  assert.equal((await request('{"name":')).status, 400);
});

for (const [encoding, compress] of [["gzip", gzipSync], ["deflate", deflateSync]]) {
  test(`rejects ${encoding} contact JSON`, async () => {
    assert.equal((await request(compress(contact), encoding)).status, 415);
  });

  test(`rejects invalid ${encoding} bytes without decompression`, async () => {
    assert.equal((await request(Buffer.from([0, 255, 1, 254]), encoding)).status, 415);
  });
}

test("remains healthy after rejected request bodies", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.equal(JSON.parse(response.body).status, "ok");
});
