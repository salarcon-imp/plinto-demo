import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtScanScreen } from '../../assets/zip-v2';
import { MockupScreen } from '../../components/layout/MockupScreen';

export function ScanPiecePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate('/workfound/yellow-tide');
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <MockupScreen alt="Plinto art scan screen" className="zip-artscan" imageSrc={ArtScanScreen}>
      <button className="hotspot hotspot--artscan-close" onClick={() => navigate('/marketplace')} type="button">
        <span className="sr-only">Close art scan</span>
      </button>
      <button className="hotspot hotspot--artscan-trigger" onClick={() => navigate('/workfound/yellow-tide')} type="button">
        <span className="sr-only">Complete scan</span>
      </button>
    </MockupScreen>
  );
}
