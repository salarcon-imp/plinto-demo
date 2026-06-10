import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import {
  MOTION_DURATION_MD,
  MOTION_EASE,
  MOTION_OFFSET_Y,
  MOTION_STAGGER,
} from '../../animations/presets/motion';
import { brandAssets } from '../../assets/logos';
import { EventInvitationCard } from '../../components/cards/EventInvitationCard';
import { NotFoundState } from '../../components/feedback/NotFoundState';
import { PageHeader } from '../../components/navigation/PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { invitations } from '../../data';
import { formatLongDate, getEventById, getUserById } from '../../utils/plinto';

import { ArrowRight, Calendar, ChevronDown, Palette, Eye, Library, HatGlasses, Images, UserRound } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { gsap } from '../../animations/gsap'; // (Tus imports previos se mantienen)


type InvitationPhase = 1 | 2 | 3 | 4 | 5 | 6;

export function InvitationPage() {
  const [phase, setPhase] = useState<InvitationPhase>(1);
  
  // Fase 3
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '' });
  // Fase 4
  const [relation, setRelation] = useState<string | null>(null);
  // Fase 5
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const buttonText: Partial<Record<InvitationPhase, string>> = {
    2: 'Reserva tu lugar',
    6: 'Agregar a Calendario',
  };

  const isPhaseValid = (): boolean => {
    if (phase === 3) {
      return (
        formData.nombre.trim() !== '' &&
        formData.apellido.trim() !== '' &&
        formData.correo.includes('@') &&
        formData.correo.includes('.')
      );
    }
    if (phase === 4) {
      return relation !== null;
    }
    if (phase === 5) {
      return selectedTags.length >= 1 && selectedTags.length <= 2;
    }
    return true;
  };

  const nextPhase = () => {
    if (phase < 6 && isPhaseValid()) {
      setPhase((prev) => (prev + 1) as InvitationPhase);
    }
    if (phase === 6) setPhase(1 as InvitationPhase);
  };

  const relationOptions = [
    { id: 'maker', title: 'Soy Artista', subtitle: 'Creo obras', icon: <Palette size={20} /> },
    { id: 'keeper', title: 'Soy Coleccionista', subtitle: 'Adquiero obras', icon: <Images size={20} /> },
    { id: 'maker-keeper', title: 'Ambas', subtitle: '', icon: <UserRound size={20} /> },
    { id: 'aficionado', title: 'Solo me interesa el arte', subtitle: '', icon: <HatGlasses size={20} /> },
  ];

  const artTags = [
    'Arte Pop', 'Realismo','Abstracción', 'Arte Digital',
    'Impresionismo', 'Figurativo', 'Hiperrealismo',
    'Conceptual', 'Minimalismo', 'Contemporáneo'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 2) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  return (
    <section className={`invitation invitation--phase-${phase}`}>
      <div className="invitation__brand">
        <img alt="Plinto" className="invitation__logo" src={brandAssets.BrandMark} />
      </div>

      <div
        className={`invitation__card ${phase === 1 ? 'invitation__card--clickable' : ''}`}
        onClick={phase === 1 ? nextPhase : undefined}
        role={phase === 1 ? 'button' : undefined}
        tabIndex={phase === 1 ? 0 : undefined}
      >     
        {phase === 1 && (
          <div className="invitation__step-content invitation__step-content--phase1">
            <h2 className="invitation__title">Has sido seleccionado</h2>

            <div className="invitation__phase1-icon">
              <ChevronDown size={24} strokeWidth={1} />
            </div>

          </div>
        )}

        {phase === 2 && (
          <div className="invitation__step-content">
            <div className="invitation__headline">
              <h2 className="invitation__title">Tienes</h2>
              <div className="invitation__invite-count">1</div>
              <h2 className="invitation__title">lugar en el plinto</h2>
            </div>

            <p className="invitation__description">
              Antes del evento, necesitamos algunos datos para personalizar tu experiencia.
            </p>
            
            <div className="invitation__table-container">
              <table className="invitation__table">
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>HORA</th>
                    <th>LUGAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>22 de agosto, 2026</td>
                    <td>18:00pm</td>
                    <td>Rozas-Botrán</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {phase === 3 && (
          <div className="invitation__step-content">
            <div className="invitation__headline">
              <h2 className="invitation__title">Tienes</h2>
              <div className="invitation__invite-count">1</div>
              <h2 className="invitation__title">lugar en el plinto</h2>
            </div>

            <p className="invitation__description">
              Antes del evento, necesitamos algunos datos para personalizar tu experiencia.
            </p>
            
            <div className="invitation__table-container">
              <table className="invitation__table">
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>HORA</th>
                    <th>LUGAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>22 de agosto, 2026</td>
                    <td>18:00pm</td>
                    <td>Rozas-Botrán</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className="invitation__divider" />
            
            {/* Campos de Input */}
            <div className="invitation__form">
              <input 
                type="text" 
                className="invitation__input" 
                placeholder="Nombre" 
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              <input 
                type="text" 
                className="invitation__input" 
                placeholder="Apellido" 
                value={formData.apellido}
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
              />
              <input 
                type="email" 
                className="invitation__input" 
                placeholder="Correo Electrónico" 
                value={formData.correo}
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
              />
            </div>
          </div>
        )}

        {phase === 4 && (
          <div className="invitation__step-content">
            <h2 className="invitation__title">¿Cómo describes tu relación con el arte?</h2>
            <hr className="invitation__divider" />
            
            <div className="invitation__options-list">
              {relationOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`invitation__option-btn ${relation === opt.id ? 'invitation__option-btn--active' : ''}`}
                  onClick={() => setRelation(opt.id)}
                >
                  <div className="invitation__option-icon">
                    {opt.icon}
                  </div>
                  <div className="invitation__option-text">
                    <span className="invitation__option-title">{opt.title}</span>
                    <span className="invitation__option-subtitle">{opt.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 5 && (
          <div className="invitation__step-content">
            <h2 className="invitation__title">¿Qué tipo de arte te mueve?</h2>
            <p className="invitation__description">Selecciona hasta 2 opciones.</p>
            <hr className="invitation__divider" />
            
            <div className="invitation__tags-group">
              {artTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                const isMaxReached = selectedTags.length >= 2 && !isSelected;
                
                return (
                  <button
                    key={tag}
                    type="button"
                    disabled={isMaxReached}
                    className={`invitation__tag ${isSelected ? 'invitation__tag--active' : ''} ${isMaxReached ? 'invitation__tag--disabled' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase === 6 && (
          <div className="invitation__step-content">
            <h2 className="invitation__title">¡Listo!</h2>
            <p className="invitation__description">Tu registro está completo. Nos vemos pronto.</p>
          </div>
        )}

        {phase !== 1 && (
          <button
            className="invitation__submit"
            onClick={nextPhase}
            type="button"
            disabled={!isPhaseValid()}
          >
            <span>{buttonText[phase] || 'Continuar'}</span>
            {phase === 6 ? (
              <Calendar size={18} strokeWidth={1.7} />
            ) : (
              <ArrowRight size={18} strokeWidth={1.7} />
            )}
          </button>
        )}
      </div>
    </section>
  );
}