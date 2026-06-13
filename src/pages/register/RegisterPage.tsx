import { useState } from 'react';
import { ArrowRight, HatGlasses, Images, Mail, Palette, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { brandAssets } from '../../assets/logos';

type Phase = 1 | 2 | 3 | 4;

export function RegisterPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>(1);
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '' });
  const [relation, setRelation] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const isValid = (): boolean => {
    if (phase === 1) {
      return (
        formData.nombre.trim() !== '' &&
        formData.apellido.trim() !== '' &&
        formData.correo.includes('@') &&
        formData.correo.includes('.')
      );
    }
    if (phase === 2) return relation !== null;
    if (phase === 3) return selectedTags.length >= 1;
    return true;
  };

  const handleContinue = () => {
    if (!isValid()) return;
    if (phase < 4) {
      setPhase((p) => (p + 1) as Phase);
    } else {
      navigate('/onboarding');
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const relationOptions = [
    { id: 'maker',  title: 'Soy Artista',             subtitle: 'Creo obras',    icon: <Palette    size={20} strokeWidth={1.5} /> },
    { id: 'keeper', title: 'Soy Coleccionista',        subtitle: 'Adquiero obras',icon: <Images     size={20} strokeWidth={1.5} /> },
    { id: 'both',   title: 'Ambas',                   subtitle: '',              icon: <UserRound  size={20} strokeWidth={1.5} /> },
    { id: 'fan',    title: 'Solo me interesa el arte', subtitle: '',              icon: <HatGlasses size={20} strokeWidth={1.5} /> },
  ];

  const artTags = [
    'Arte Pop','Realismo','Abstracción','Arte Digital',
    'Impresionismo','Figurativo','Hiperrealismo',
    'Conceptual','Minimalismo','Contemporáneo',
  ];

  const titles: Record<Phase, string> = {
    1: 'Cuéntanos sobre ti.',
    2: '¿Cuál es tu relación con el arte?',
    3: '¿Qué tipo de arte te mueve?',
    4: 'Ya eres parte del plinto',
  };
  const descriptions: Record<Phase, string> = {
    1: 'Usaremos esto para personalizar tu experiencia.',
    2: 'Esto nos ayuda a mostrarte lo que más te interesa.',
    3: 'Elige todos los que quieras.',
    4: 'Tu cuenta está lista. Es momento de explorar.',
  };

  return (
    <section className={`intro-login intro-login--register${phase === 4 ? ' intro-login--phase4' : ''}`}>
      <div className="intro-login__brand">
        <img alt="Plinto" className="intro-login__logo intro-login__logo--light" src={brandAssets.OfficialLogo} />
      </div>

      <div className={`intro-login__card intro-login__card--register${phase === 4 ? ' intro-login__card--phase4' : ''}`}>

        <div className="intro-login__register-copy">
          <p className="intro-login__message">{titles[phase]}</p>
          {phase !== 4 && (
            <p className="intro-login__register-desc">{descriptions[phase]}</p>
          )}
          {phase === 4 && (
            <p className="intro-login__register-desc">{descriptions[4]}</p>
          )}
        </div>

        {phase !== 4 && <hr className="intro-login__register-divider" />}

        {/* Phase 1 — personal data */}
        {phase === 1 && (
          <div className="intro-login__register-form">
            <label className="intro-login__field">
              <UserRound aria-hidden="true" size={18} strokeWidth={1.6} />
              <input
                className="intro-login__input"
                placeholder="Nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </label>
            <label className="intro-login__field">
              <UserRound aria-hidden="true" size={18} strokeWidth={1.6} />
              <input
                className="intro-login__input"
                placeholder="Apellido"
                type="text"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              />
            </label>
            <label className="intro-login__field">
              <Mail aria-hidden="true" size={18} strokeWidth={1.6} />
              <input
                className="intro-login__input"
                placeholder="Correo electrónico"
                type="email"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </label>
          </div>
        )}

        {/* Phase 2 — relation */}
        {phase === 2 && (
          <div className="intro-login__register-options">
            {relationOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`intro-login__register-option ${relation === opt.id ? 'intro-login__register-option--active' : ''}`}
                onClick={() => setRelation(opt.id)}
              >
                <div className={`intro-login__register-option-icon ${relation === opt.id ? 'intro-login__register-option-icon--active' : ''}`}>
                  {opt.icon}
                </div>
                <div className="intro-login__register-option-text">
                  <span className={`intro-login__register-option-title ${relation === opt.id ? 'intro-login__register-option-title--active' : ''}`}>
                    {opt.title}
                  </span>
                  {opt.subtitle && (
                    <span className={`intro-login__register-option-sub ${relation === opt.id ? 'intro-login__register-option-sub--active' : ''}`}>
                      {opt.subtitle}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Phase 3 — art tags (unlimited selection) */}
        {phase === 3 && (
          <div className="intro-login__register-tags">
            {artTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`intro-login__register-tag ${isSelected ? 'intro-login__register-tag--active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {/* Phase 4 — confirmation (no extra content, just title + desc + CTA) */}

        <button
          className="intro-login__submit"
          onClick={handleContinue}
          type="button"
          disabled={!isValid()}
        >
          <span>{phase === 4 ? 'Comenzar' : 'Continuar'}</span>
          {phase !== 4 && <ArrowRight size={18} strokeWidth={1.7} />}
        </button>
      </div>
    </section>
  );
}
