
import React from 'react';
import './RefuellingResults.css';
import { RefuellingPhase, UserInputs } from '../../utils/calculations';

interface RefuellingResultsProps {
  refuelling: RefuellingPhase;
  inputs: UserInputs;
  tdee: number;
}

function RefuellingResults({ refuelling, inputs, tdee }: RefuellingResultsProps) {
  const isDoubleWeek = refuelling.weeks === 2;
  const maintenanceMinus5 = Math.round(tdee * 0.95);
  
  return (
    <div className="refuelling-results">
      <div className="results-header">
        <h2>🔄 Refuelling Phase</h2>
        <p className="phase-info">
          {isDoubleWeek ? (
            <span className="phase-badge refuel">Weeks {refuelling.startWeek}-{refuelling.startWeek + 1}</span>
          ) : (
            <span className="phase-badge refuel">Week {refuelling.startWeek}</span>
          )}
          <span className="strategy-badge">
            {isDoubleWeek ? 'Progressive Refuelling' : 'Rapid Refuelling'}
          </span>
        </p>
      </div>
      
      <div className="refuelling-explanation">
        <p>
          {isDoubleWeek 
            ? 'Gradually increase calories over 2 weeks to restore glycogen, support recovery, and prepare for competition.'
            : 'Quickly restore glycogen and metabolic function in the final week before competition.'}
        </p>
      </div>
      
      {isDoubleWeek ? (
        <div className="weeks-grid">
          <div className="week-card">
            <h3>Week {refuelling.startWeek}</h3>
            <p className="week-description">Transition week - midpoint between deficit and maintenance</p>
            
            <div className="week-calories">
              <span className="calories-value">{refuelling.week1Calories}</span>
              <span className="calories-label">kcal/day</span>
            </div>
            
            <div className="week-macros">
              <div className="week-macro protein">
                <span className="value">{refuelling.protein}g</span>
                <span className="label">Protein</span>
              </div>
              <div className="week-macro carb">
                <span className="value">{refuelling.week1Carbs}g</span>
                <span className="label">Carbs</span>
              </div>
              <div className="week-macro fat">
                <span className="value">{refuelling.week1Fats}g</span>
                <span className="label">Fats</span>
              </div>
            </div>
          </div>
          
          <div className="week-card final">
            <h3>Week {refuelling.startWeek + 1}</h3>
            <p className="week-description">Final week - maintenance minus 5%</p>
            
            <div className="week-calories">
              <span className="calories-value">{refuelling.week2Calories}</span>
              <span className="calories-label">kcal/day</span>
            </div>
            
            <div className="week-macros">
              <div className="week-macro protein">
                <span className="value">{refuelling.protein}g</span>
                <span className="label">Protein</span>
              </div>
              <div className="week-macro carb">
                <span className="value">{refuelling.week2Carbs}g</span>
                <span className="label">Carbs</span>
              </div>
              <div className="week-macro fat">
                <span className="value">{refuelling.week2Fats}g</span>
                <span className="label">Fats</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-week">
          <div className="week-card final single">
            <h3>Week {refuelling.startWeek}</h3>
            <p className="week-description">Maintenance minus 5% - rapid glycogen restoration</p>
            
            <div className="week-calories">
              <span className="calories-value">{refuelling.week1Calories}</span>
              <span className="calories-label">kcal/day</span>
            </div>
            
            <div className="week-macros">
              <div className="week-macro protein">
                <span className="value">{refuelling.protein}g</span>
                <span className="label">Protein</span>
              </div>
              <div className="week-macro carb">
                <span className="value">{refuelling.week1Carbs}g</span>
                <span className="label">Carbs</span>
              </div>
              <div className="week-macro fat">
                <span className="value">{refuelling.week1Fats}g</span>
                <span className="label">Fats</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="refuelling-notes">
        <h4>📝 Refuelling Phase Notes</h4>
        <ul>
          <li><strong>Protein</strong> remains at 1g/lb to maintain muscle mass</li>
          <li><strong>Fats</strong> increase to 0.6g/kg for hormonal support and recovery</li>
          <li><strong>Carbs</strong> fill remaining calories to restore glycogen stores</li>
          <li>Expect weight to increase 1-2kg from glycogen and water retention - this is normal and desired</li>
          <li>Training intensity can gradually increase as energy improves</li>
        </ul>
      </div>
    </div>
  );
}

export default RefuellingResults;
