import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Linkedin, Github } from 'lucide-react';
import { personalDetails } from '../data/resumeData';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Cybersecurity Internship Opportunity',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', msg: data.message || 'Message sent.' });
        setForm({ name: '', email: '', subject: 'Cybersecurity Internship Opportunity', message: '' });
      } else {
        setFeedback({ type: 'error', msg: data.error || 'Failed to send.' });
      }
    } catch {
      setFeedback({ type: 'error', msg: 'Network error — email tejasx7788@gmail.com directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-[#06060f] border border-[#1a1a3a] font-mono text-xs text-[#e8e8f0] placeholder-[#3a3a60] focus:outline-none focus:border-[#4f8ef7] transition-colors';

  return (
    <section id="contact" className="bg-[#06060f] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        <div className="section-num">[ 08 / 08 ] — CONTACT</div>

        {/* Big editorial CTA */}
        <div className="border-b border-[#1a1a3a] pb-16">
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.88] text-white uppercase">
            Get in<br />
            <span className="text-[#4f8ef7]">Touch.</span>
          </h2>
          <p className="mt-6 text-[#6b6b9a] text-sm max-w-xl leading-relaxed">
            Interested in offering a 3-month cybersecurity internship, discussing network
            monitoring tools, or reviewing project code? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — contact details */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-0 border border-[#1a1a3a]">
              {[
                { icon: Mail, label: 'Email', value: personalDetails.email, copyKey: 'email', link: `mailto:${personalDetails.email}` },
                { icon: Phone, label: 'Phone', value: `+91 ${personalDetails.phone}`, copyKey: 'phone', link: `tel:${personalDetails.phone}` },
                { icon: MapPin, label: 'Location', value: personalDetails.location, copyKey: null, link: null },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 px-6 py-5 border-b border-[#1a1a3a] last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-4 h-4 text-[#4f8ef7] shrink-0" />
                    <div>
                      <div className="font-mono text-[10px] text-[#3a3a60] uppercase tracking-wider">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} className="font-mono text-xs text-[#e8e8f0] hover:text-[#4f8ef7] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-mono text-xs text-[#e8e8f0]">{item.value}</div>
                      )}
                    </div>
                  </div>
                  {item.copyKey && (
                    <button
                      onClick={() => handleCopy(item.value, item.copyKey!)}
                      className="text-[#3a3a60] hover:text-[#4f8ef7] transition-colors"
                    >
                      {copied === item.copyKey ? <Check className="w-4 h-4 text-[#4f8ef7]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-[#1a1a3a] font-mono text-xs uppercase tracking-widest text-[#6b6b9a] hover:border-[#7c5cfc] hover:text-[#7c5cfc] transition-all"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-[#1a1a3a] font-mono text-xs uppercase tracking-widest text-[#6b6b9a] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8 border border-[#1a1a3a]">
            <div className="px-8 py-5 border-b border-[#1a1a3a]">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#4f8ef7]">
                Send a Message
              </span>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60]">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60]">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60]">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a60]">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {feedback && (
                <div className={`font-mono text-xs px-4 py-3 border ${
                  feedback.type === 'success'
                    ? 'border-[#4f8ef7]/40 text-[#4f8ef7] bg-[#4f8ef7]/5'
                    : 'border-red-900/40 text-red-400 bg-red-900/5'
                }`}>
                  {feedback.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#4f8ef7] text-[#06060f] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
