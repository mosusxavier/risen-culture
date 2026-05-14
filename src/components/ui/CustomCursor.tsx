'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number>(0);
  const dotPos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on devices with a fine pointer (like a mouse)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      const onMouseMove = (e: MouseEvent) => {
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
      };

      const animate = () => {
        outlinePos.current.x += (dotPos.current.x - outlinePos.current.x) * 0.15;
        outlinePos.current.y += (dotPos.current.y - outlinePos.current.y) * 0.15;

        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
        }
        if (cursorOutlineRef.current) {
          cursorOutlineRef.current.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0)`;
        }

        requestRef.current = requestAnimationFrame(animate);
      };

      window.addEventListener('mousemove', onMouseMove);
      requestRef.current = requestAnimationFrame(animate);

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('a') || 
          target.closest('button') ||
          window.getComputedStyle(target).cursor === 'pointer'
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
          backgroundColor: isHovering ? 'var(--white)' : 'var(--burgundy)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: isHovering ? '-6px' : '-4px',
          marginTop: isHovering ? '-6px' : '-4px',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, margin 0.2s',
        }}
      />
      <div
        ref={cursorOutlineRef}
        className="custom-cursor-outline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          border: isHovering ? '1px solid transparent' : '1px solid rgba(123, 28, 46, 0.5)',
          backgroundColor: isHovering ? 'rgba(245, 240, 235, 0.05)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          marginLeft: isHovering ? '-30px' : '-20px',
          marginTop: isHovering ? '-30px' : '-20px',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s, margin 0.2s',
        }}
      />
      <style>{`
        @media (pointer: fine) {
          body, html, a, button, .pcard, select, .reveal, .nav-desktop, .nav-mobile {
            cursor: none !important;
          }
          input, textarea {
            cursor: text !important;
          }
        }
        @media (max-width: 768px) {
          .custom-cursor-dot, .custom-cursor-outline {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
