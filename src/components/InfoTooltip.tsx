import React, { useState, useRef, useEffect } from 'react';
import './InfoTooltip.css';

interface InfoTooltipProps {
  children: React.ReactNode;
}

function InfoTooltip({ children }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll on mobile when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="info-tooltip-container">
      <button
        ref={buttonRef}
        type="button"
        className="info-tooltip-trigger"
        onClick={handleToggle}
        aria-label="More information"
      >
        ℹ️
      </button>
      {isVisible && (
        <>
          <div className="info-tooltip-overlay" onClick={() => setIsVisible(false)} />
          <div ref={tooltipRef} className="info-tooltip-content">
            <button 
              className="info-tooltip-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
            {children}
          </div>
        </>
      )}
    </div>
  );
}
export default InfoTooltip;
