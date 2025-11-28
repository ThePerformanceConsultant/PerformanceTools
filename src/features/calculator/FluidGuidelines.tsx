
import React from 'react';
import './FluidGuidelines.css';

interface FluidGuidelinesProps {
  weightKg: number;
}

function FluidGuidelines({ weightKg }: FluidGuidelinesProps) {
  const fluidTargetLow = Math.round(weightKg * 40);
  const fluidTargetHigh = Math.round(weightKg * 45);

  return (
    <div className="fluid-guidelines">
      <div className="fluid-header">
        <h2>💧 Fluid Guidelines</h2>
        <p className="fluid-subtitle">Weeks 1-5 (Entire Protocol)</p>
      </div>

      <div className="fluid-content">
        <div className="fluid-target-card">
          <div className="fluid-icon">🥤</div>
          <div className="fluid-target">
            <span className="fluid-range">{fluidTargetLow} - {fluidTargetHigh}</span>
            <span className="fluid-unit">mL/day</span>
          </div>
          <div className="fluid-calculation">
            ({weightKg}kg × 40-45mL)
          </div>
        </div>

        <div className="fluid-tips">
          <h4>Hydration Tips</h4>
          <ul>
            <li>Spread fluid intake evenly throughout the day</li>
            <li>Start each day with 500mL of water upon waking</li>
            <li>Drink 500mL with each main meal</li>
            <li>Sip water during training sessions</li>
            <li>Monitor urine colour - aim for pale yellow</li>
            <li>Include electrolytes if training in hot conditions or sweating heavily</li>
          </ul>
        </div>

        <div className="fluid-sources">
          <h4>Acceptable Fluid Sources</h4>
          <div className="sources-grid">
            <div className="source-item good">
              <span className="source-icon">✅</span>
              <span>Water</span>
            </div>
            <div className="source-item good">
              <span className="source-icon">✅</span>
              <span>Black Coffee</span>
            </div>
            <div className="source-item good">
              <span className="source-icon">✅</span>
              <span>Green/Herbal Tea</span>
            </div>
            <div className="source-item good">
              <span className="source-icon">✅</span>
              <span>Sugar-free Electrolytes</span>
            </div>
            <div className="source-item limited">
              <span className="source-icon">⚠️</span>
              <span>Diet Soft Drinks (limit)</span>
            </div>
            <div className="source-item avoid">
              <span className="source-icon">❌</span>
              <span>Sugary Drinks</span>
            </div>
            <div className="source-item avoid">
              <span className="source-icon">❌</span>
              <span>Alcohol</span>
            </div>
            <div className="source-item avoid">
              <span className="source-icon">❌</span>
              <span>Fruit Juice</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fluid-note">
        <span className="note-icon">📋</span>
        <p>
          <strong>Final Week Guidelines:</strong> Specific fluid manipulation protocols for the final 
          week before competition will be provided separately. These require careful timing and 
          individual adjustments based on your response.
        </p>
      </div>
    </div>
  );
}

export default FluidGuidelines;
