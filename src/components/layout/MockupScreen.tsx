import { useEffect, useRef, type PropsWithChildren } from 'react';
import { gsap } from '../../animations/gsap';
import { MOTION_DURATION_MD, MOTION_EASE } from '../../animations/presets/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type MockupScreenProps = PropsWithChildren<{
  alt: string;
  className?: string;
  imageSrc: string;
}>;

export function MockupScreen({ alt, children, className = '', imageSrc }: MockupScreenProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.mockup-screen__image, .mockup-screen__overlay > *', {
        autoAlpha: 0,
        duration: MOTION_DURATION_MD,
        ease: MOTION_EASE,
      });
    }, rootRef);

    return () => context.revert();
  }, [imageSrc, reducedMotion]);

  return (
    <section className={`mockup-screen ${className}`.trim()} ref={rootRef}>
      <img alt={alt} className="mockup-screen__image" src={imageSrc} />
      <div className="mockup-screen__overlay">{children}</div>
    </section>
  );
}
