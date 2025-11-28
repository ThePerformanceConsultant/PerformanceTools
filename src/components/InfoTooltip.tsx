import React, { useState, useRef, useEffect } from 'react';
import './InfoTooltip.css';

interface InfoTooltipProps {
  children: React.ReactNode;
}

function InfoTooltip({ children }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Scroll tooltip into view on mobile
      if (tooltipRef.current && window.innerWidth <= 768) {
        setTimeout(() => {
          tooltipRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 50);
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="info-tooltip-container" ref={containerRef}>
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
        <div ref={tooltipRef} className="info-tooltip-content">
          <button 
            className="info-tooltip-close"
            onClick={() => setIsVisible(false)}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
          <div className="info-tooltip-body">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoTooltip;
