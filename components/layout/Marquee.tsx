'use client';

import { useRef, useLayoutEffect } from 'react';

const items = [
  'Web Design & Development',
  'E-commerce Solutions',
  'Social Media Management',
  'Paid Advertising',
  'Email Marketing',
  'Traditional Marketing',
  'DOOH/OOH',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!setRef.current || !trackRef.current) return;
    const w = setRef.current.scrollWidth;
    trackRef.current.style.setProperty('--set-width', `${w}px`);
  }, []);

  const itemClass =
    'text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2.5 whitespace-nowrap shrink-0';

  const renderItems = (ariaHidden?: boolean) => (
    <div
      ref={ariaHidden ? undefined : setRef}
      className="flex items-center gap-12 pr-12 shrink-0"
      aria-hidden={ariaHidden}
      style={{ maxWidth: 'none' }}
    >
      {items.map((item, i) => (
        <span key={i} className={itemClass}>
          <span className="w-1 h-1 rounded-full bg-[#FF1E1E]/60 shrink-0" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 border-y border-white/3 py-3.5 overflow-hidden bg-[#050505]/50 backdrop-blur-sm">
      <div
        ref={trackRef}
        className="animate-marquee"
        style={{ display: 'inline-flex', alignItems: 'center', willChange: 'transform', whiteSpace: 'nowrap', maxWidth: 'none' }}
      >
        {renderItems()}
        {renderItems(true)}
      </div>
    </div>
  );
}
