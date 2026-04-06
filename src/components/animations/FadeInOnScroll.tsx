import React, { useEffect, useRef, useState } from "react";

type FadeInOnScrollProps = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  once?: boolean;
};

export default function FadeInOnScroll({
  children,
  delayMs = 0,
  className = "",
  once = true,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`will-change-transform will-change-opacity transition duration-700 ease-out 
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
        motion-reduce:transition-none motion-reduce:transform-none ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
