
import React from 'react';
import './MacroResults.css';
import { MacroResults as MacroResultsType, UserInputs } from '../../utils/calculations';

interface MacroResultsProps {
  results: MacroResultsType;
  inputs: UserInputs;
}

function MacroResults({ results, inputs }: MacroResultsProps) {
  const phaseDuration = inputs.refuelling === 'steady' ? 3 : 4;
  const expectedWeightLoss = (results.weeklyWeightLoss * phaseDuration).toFixed(1);
  
  return (
    <div className="macro-results">
      <div className="results-header">
        <h2>🔥 Rapid Fat Loss Phase</h2>
        <p className="phase-info">
          <span className="phase-badge">Weeks 1-{phaseDuration}</span>
          <span className="deficit-badge">{results.deficitPercent}% Deficit</span>
        </p>
      </div>
      
      <div className="energy-breakdown">
        <div className="energy-item">
          <span className="energy-label">Estimated TDEE</span>
          <span className="energy-value">{results.tdee} kcal</span>
        </div>
        <div className="energy-arrow">→</div>
        <div className="energy-item target">
          <span className="energy-label">Target Intake</span>
          <span className="energy-value">{results.calories} kcal</span>
        </div>
      </div>
      
      <div className="macros-grid">
        <div className="macro-card protein">
          <div className="macro-icon">🥩</div>
          <div className="macro-value">{results.protein}g</div>
          <div className="macro-label">Protein</div>
          <div className="macro-detail">1g per lb body weight</div>
          <div className="macro-kcal">{results.protein * 4} kcal</div>
        </div>
        
        <div className="macro-card carbs">
          <div className="macro-icon">🍚</div>
          <div className="macro-value">{results.carbs}g</div>
          <div className="macro-label">Carbohydrates</div>
          <div className="macro-detail">Performance fuel</div>
          <div className="macro-kcal">{results.carbs * 4} kcal</div>
        </div>
        
        <div className="macro-card fats">
          <div className="macro-icon">🥑</div>
          <div className="macro-value">{results.fats}g</div>
          <div className="macro-label">Fats</div>
          <div className="macro-detail">0.35g per kg body weight</div>
          <div className="macro-kcal">{results.fats * 9} kcal</div>
        </div>
      </div>
      
      <div className="projections">
        <h3>Projected Outcomes</h3>
        <div className="projection-grid">
          <div className="projection-item">
            <span className="projection-value">{results.weeklyWeightLoss}kg</span>
            <span className="projection-label">Expected Weekly Loss</span>
          </div>
          <div className="projection-item">
            <span className="projection-value">{expectedWeightLoss}kg</span>
            <span className="projection-label">Total Phase Loss (~{((parseFloat(expectedWeightLoss) / inputs.weight) * 100).toFixed(1)}%)</span>
          </div>
          <div className="projection-item">
            <span className="projection-value">{(inputs.weight - parseFloat(expectedWeightLoss)).toFixed(1)}kg</span>
            <span className="projection-label">End of Phase Weight</span>
          </div>
        </div>
        <p className="projection-note">
          * Remaining weight loss (~2-3%) will come from low-residue diet and fluid manipulation in the final week
        </p>
      </div>
      
      <div className="breakdown-details">
        <h3>Calculation Breakdown</h3>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="breakdown-label">BMR (Mifflin-St Jeor)</span>
            <span className="breakdown-value">{results.bmr} kcal</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Daily Steps ({inputs.steps.toLocaleString()})</span>
            <span className="breakdown-value">+{results.stepsCalories} kcal</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Training ({inputs.trainingSessions}x/week)</span>
            <span className="breakdown-value">+{results.trainingCaloriesDaily} kcal/day</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Cardio ({inputs.cardioMinutes} min/week)</span>
            <span className="breakdown-value">+{results.cardioCaloriesDaily} kcal/day</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">NEAT Estimate</span>
            <span className="breakdown-value">+{results.neatCalories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacroResults;
