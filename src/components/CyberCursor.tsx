import React, { useEffect, useRef, useState } from 'react';

export const CyberCursor: React.FC = () => {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef<number>(0);
  const [clicking, setClicking]   = useState(false);
  const [hovering, setHovering]   = useState(false);

  useEffect(() => {
    /* hide OS cursor site-wide */
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isHover =
        target.closest('a, button, [role="button"], input, textarea, select, label') !== null;
      setHovering(isHover);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    /* smooth trailing ring */
    const animate = () => {
      const ease = 0.12;
      ring.current.x += (pos.current.x - ring.current.x) * ease;
      ring.current.y += (pos.current.y - ring.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          width:  hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          border: hovering
            ? '1px solid rgba(124,92,252,0.8)'
            : '1px solid rgba(79,142,247,0.5)',
          borderRadius: hovering ? '0px' : '50%',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, border-radius 0.2s',
          boxShadow: hovering
            ? '0 0 12px rgba(124,92,252,0.4), inset 0 0 8px rgba(124,92,252,0.1)'
            : '0 0 8px rgba(79,142,247,0.25)',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          width:  clicking ? 6 : hovering ? 8 : 5,
          height: clicking ? 6 : hovering ? 8 : 5,
          background: hovering ? '#7c5cfc' : '#4f8ef7',
          borderRadius: hovering ? '0px' : '50%',
          transition: 'width 0.1s, height 0.1s, background 0.15s, border-radius 0.15s',
          boxShadow: hovering
            ? '0 0 10px rgba(124,92,252,0.9)'
            : '0 0 8px rgba(79,142,247,0.8)',
        }}
      />

      {/* Click ripple */}
      {clicking && (
        <div
          className="pointer-events-none fixed top-0 left-0 z-[99998] animate-ping"
          style={{
            width: 20,
            height: 20,
            border: '1px solid rgba(79,142,247,0.6)',
            borderRadius: '50%',
            transform: `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`,
          }}
        />
      )}
    </>
  );
};
