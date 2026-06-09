import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Onboarding1, Onboarding2, Onboarding3, Onboarding4 } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

const SLIDES = [Onboarding1, Onboarding2, Onboarding3, Onboarding4];

export function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const isLast = index === SLIDES.length - 1;

  const handleContinue = () => {
    if (isLast) {
      navigate('/login');
      return;
    }

    setIndex((current) => current + 1);
  };

  return (
    <MockupScreen
      alt={`Plinto onboarding slide ${index + 1}`}
      className="zip-onboarding"
      imageSrc={SLIDES[index]}
    >
      <Link className="hotspot hotspot--onboarding-skip" to="/login">
        <span className="sr-only">Skip onboarding</span>
      </Link>
      <button className="hotspot hotspot--onboarding-continue" onClick={handleContinue} type="button">
        <span className="sr-only">{isLast ? 'Get started' : 'Continue'}</span>
      </button>
    </MockupScreen>
  );
}
