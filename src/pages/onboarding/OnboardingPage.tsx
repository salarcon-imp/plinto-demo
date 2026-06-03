import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_SM,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import BrandMark from '../../assets/logos/BrandMark.svg';
import { PrimaryButton } from '../../components/primitives/PrimaryButton';
import { SecondaryButton } from '../../components/primitives/SecondaryButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  tone: string;
  accent: string;
};

const slides: OnboardingSlide[] = [
  {
    id: 'intro',
    title: "Hi. I'm Plinto.",
    description: 'A curated layer where a work can be discovered, contextualized and remembered.',
    tone:
      'radial-gradient(circle at 50% 22%, rgba(255,255,255,0.94), transparent 18%), linear-gradient(180deg, #1f2026 0%, #6c5f58 48%, #f6f2ea 100%)',
    accent: '#c8c3ba',
  },
  {
    id: 'permanence',
    title: 'What enters here never disappears.',
    description:
      'Every work inscribed on the plinth receives a permanent, visible record that can be revisited over time.',
    tone:
      'radial-gradient(circle at 65% 20%, rgba(255,216,162,0.88), transparent 18%), linear-gradient(160deg, #10131b 0%, #324b64 40%, #f5f5f3 100%)',
    accent: '#6ba3c8',
  },
  {
    id: 'demo',
    title: 'Today we show you how it works.',
    description:
      'You will explore a verified marketplace, open a work profile and inspect the identity behind a real object.',
    tone:
      'radial-gradient(circle at 74% 18%, rgba(255,255,255,0.84), transparent 18%), linear-gradient(150deg, #f3f1ec 0%, #7f8fa5 44%, #1b1f28 100%)',
    accent: '#324b64',
  },
  {
    id: 'ready',
    title: 'Ready for this experience?',
    description:
      'Start the journey and move into the live demo environment prepared for clients, galleries and stakeholders.',
    tone:
      'radial-gradient(circle at 50% 18%, rgba(255,220,170,0.92), transparent 18%), linear-gradient(180deg, #17191f 0%, #6a4c42 44%, #f6f1e8 100%)',
    accent: '#f1b36d',
  },
];

export function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const slideRef = useRef<HTMLDivElement | null>(null);

  const slide = useMemo(() => slides[currentSlide], [currentSlide]);
  const isLastSlide = currentSlide === slides.length - 1;

  useEffect(() => {
    if (reducedMotion || !slideRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.onboarding-slide__visual, .onboarding-slide__content > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_SM,
        stagger: MOTION_STAGGER,
        ease: MOTION_EASE,
      });
    }, slideRef);

    return () => context.revert();
  }, [currentSlide, reducedMotion]);

  const handleContinue = () => {
    if (isLastSlide) {
      navigate('/login');
      return;
    }

    setCurrentSlide((value) => value + 1);
  };

  return (
    <section className="onboarding-page">
      <div className="onboarding-topbar">
        <span className="onboarding-topbar__step">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <Link className="onboarding-topbar__skip" to="/login">
          Skip
        </Link>
      </div>

      <div className="onboarding-slide" key={slide.id} ref={slideRef}>
        <div className="onboarding-slide__visual" style={{ backgroundImage: slide.tone }}>
          <div
            className="onboarding-slide__orb"
            style={{ boxShadow: `0 0 80px ${slide.accent}` }}
          />
          <img alt="" className="onboarding-slide__mark" src={BrandMark} />
        </div>

        <div className="onboarding-slide__content">
          <h1 className="onboarding-slide__title">{slide.title}</h1>
          <p className="onboarding-slide__description">{slide.description}</p>
        </div>
      </div>

      <div className="onboarding-progress" aria-label="Onboarding progress">
        {slides.map((item, index) => (
          <span
            className={`onboarding-progress__dot ${
              index === currentSlide ? 'onboarding-progress__dot--active' : ''
            }`.trim()}
            key={item.id}
          />
        ))}
      </div>

      <div className="onboarding-actions">
        {!isLastSlide ? (
          <>
            <SecondaryButton onClick={() => navigate('/login')}>Skip</SecondaryButton>
            <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
          </>
        ) : (
          <PrimaryButton onClick={handleContinue}>Start</PrimaryButton>
        )}
      </div>
    </section>
  );
}
