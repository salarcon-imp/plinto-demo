import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronsRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import { MOTION_DURATION_MD, MOTION_EASE, MOTION_OFFSET_Y } from '../../animations/presets/motion';
import Onboarding1 from '../../assets/onboarding/plinto-login-1.svg';
import Onboarding2 from '../../assets/onboarding/plinto-login-2.svg';
import Onboarding3 from '../../assets/onboarding/plinto-login-3.svg';
import Onboarding4 from '../../assets/onboarding/plinto-login-4.svg';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type OnboardingSlide = {
  id: string;
  image: string;
  title: string[];
  description: string;
  cta: string;
  imageClassName: string;
  live?: boolean;
};

const SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    image: Onboarding1,
    title: ['Hi.', "I’m Plinto"],
    description: '',
    cta: 'Continue',
    imageClassName: 'intro-onboarding__image--one',
  },
  {
    id: 'slide-2',
    image: Onboarding2,
    title: ['What enters here never', 'disappears.'],
    description:
      'Every work inscribed on the plinth has a permanent, verifiable record. One that cannot be altered or erased.',
    cta: 'Continue',
    imageClassName: 'intro-onboarding__image--two',
  },
  {
    id: 'slide-3',
    image: Onboarding3,
    title: ['Today we show you how it', 'works.'],
    description: 'A real work. A real record. See for yourself that it exists in our infrastructure.',
    cta: 'Continue',
    imageClassName: 'intro-onboarding__image--three',
  },
  {
    id: 'slide-4',
    image: Onboarding4,
    title: ['Ready for this experience?'],
    description: 'Explore the marketplace and verify your first plinted work',
    cta: 'Start',
    imageClassName: 'intro-onboarding__image--four',
    live: true,
  },
];

export function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const slideRef = useRef<HTMLDivElement | null>(null);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  useEffect(() => {
    if (reducedMotion || !slideRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.intro-onboarding__visual, .intro-onboarding__copy > *', {
        autoAlpha: 0,
        y: MOTION_OFFSET_Y,
        duration: MOTION_DURATION_MD,
        ease: MOTION_EASE,
        stagger: 0.05,
      });
    }, slideRef);

    return () => context.revert();
  }, [index, reducedMotion]);

  const handleContinue = () => {
    if (isLast) {
      navigate('/login');
      return;
    }

    setIndex((current) => current + 1);
  };

  return (
    <section className="intro-onboarding" ref={slideRef}>
      <div className="intro-home__status">
        <span>9:41</span>
        <span className="intro-home__status-icons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="intro-onboarding__topbar">
        <div />
        <Link className="intro-onboarding__skip" to="/login">
          Saltar
        </Link>
      </div>

      <div className="intro-onboarding__visual">
        <img alt="" className={`intro-onboarding__image ${slide.imageClassName}`} src={slide.image} />
      </div>

      <div className="intro-onboarding__copy">
        {slide.live ? (
          <span className="intro-onboarding__live">
            <span className="intro-onboarding__live-dot" />
            LIVE
          </span>
        ) : null}

        <h1 className="intro-onboarding__title">
          {slide.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        {slide.description ? <p className="intro-onboarding__description">{slide.description}</p> : null}

        <div className="intro-onboarding__progress" aria-label="Onboarding progress">
          {SLIDES.map((item, itemIndex) => (
            <span
              className={`intro-onboarding__dot ${
                itemIndex === index ? 'intro-onboarding__dot--active' : ''
              }`.trim()}
              key={item.id}
            />
          ))}
        </div>
      </div>

      <button className="intro-onboarding__button" onClick={handleContinue} type="button">
        <span>{slide.cta}</span>
        {isLast ? <ArrowRight size={22} strokeWidth={1.6} /> : <ChevronsRight size={20} strokeWidth={1.6} />}
      </button>
    </section>
  );
}
