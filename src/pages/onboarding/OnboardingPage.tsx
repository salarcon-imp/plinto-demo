import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronsRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import { MOTION_DURATION_MD, MOTION_EASE, MOTION_OFFSET_Y } from '../../animations/presets/motion';
import Onboarding1 from '../../assets/onboarding/plinto-waving.png';
import Onboarding2 from '../../assets/onboarding/plinto-blockchain.png';
import Onboarding3 from '../../assets/onboarding/plinto-art.png';
import Onboarding4 from '../../assets/onboarding/plinto-looking.png';
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
    title: ['Hola.', 'Soy Plinto.'],
    description: '',
    cta: 'Continuar',
    imageClassName: 'intro-onboarding__image--one',
  },
  {
    id: 'slide-2',
    image: Onboarding2,
    title: ['Lo que entra aquí no', 'desaparece.'],
    description:
      'Cada obra inscrita en el plinto tiene un registro permanente, verificable, que no puede alterarse ni borrarse.',
    cta: 'Continuar',
    imageClassName: 'intro-onboarding__image--two',
  },
  {
    id: 'slide-3',
    image: Onboarding3,
    title: ['Hoy te mostramos como', 'funciona.'],
    description: 'Una obra real. Un registro real. Verifica con tus propios ojos que existe en nuestra infraestructura.',
    cta: 'Continuar',
    imageClassName: 'intro-onboarding__image--three',
  },
  {
    id: 'slide-4',
    image: Onboarding4,
    title: ['¿Listo para esta', 'experiencia?'],
    description: 'Explora el marketplace y verifica tu primera obra plintada.',
    cta: 'Comenzar',
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
      navigate('/marketplace');
      return;
    }

    setIndex((current) => current + 1);
  };

  return (
    <section className="intro-onboarding" ref={slideRef}>
      <div className="intro-onboarding__topbar">
        <div />
        <Link className="intro-onboarding__skip" to="/marketplace">
          Saltar
        </Link>
      </div>

      <div className="intro-onboarding__visual">
        {SLIDES.map((item, itemIndex) => (
          <img
            key={item.id}
            alt=""
            className={`intro-onboarding__image ${item.imageClassName} ${
              itemIndex === index ? 'intro-onboarding__image--active' : ''
            }`.trim()}
            src={item.image}
          />
        ))}
      </div>

      <div className="intro-onboarding__copy">
        {slide.live ? (
          <span className="intro-onboarding__live">
            <span className="intro-onboarding__live-dot" />
            EN VIVO
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
