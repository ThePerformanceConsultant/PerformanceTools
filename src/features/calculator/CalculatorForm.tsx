
import React, { useState } from 'react';
import './CalculatorForm.css';
import { UserInputs } from '../../utils/calculations';
import InfoTooltip from '../../components/InfoTooltip';

interface CalculatorFormProps {
  onCalculate: (inputs: UserInputs) => void;
}

function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(85);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [steps, setSteps] = useState(12000);
  const [trainingSessions, setTrainingSessions] = useState(5);
  const [cardioMinutes, setCardioMinutes] = useState(60);
  const [weightToLose, setWeightToLose] = useState(6);
  const [risk, setRisk] = useState<'low' | 'medium' | 'high'>('medium');
  const [refuelling, setRefuelling] = useState<'steady' | 'rapid'>('steady');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [trainingTime, setTrainingTime] = useState('17:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      age,
      weight,
      height,
      gender,
      steps,
      trainingSessions,
      cardioMinutes,
      weightToLose,
      risk,
      refuelling,
      wakeTime,
      trainingTime,
    });
  };

  const weightLossExample = ((weight * weightToLose) / 100).toFixed(1);

  return (
    <form className="calculator-form" onSubmit={handleSubmit}>
      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">👤</span>
          Personal Details
        </h2>
        <p className="section-subtitle">Used for BMR calculation</p>
        
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="age">Age (years)</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={16}
              max={65}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min={40}
              max={200}
              step={0.5}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={140}
              max={220}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">🏃</span>
          Activity Levels
        </h2>
        
        <div className="slider-group">
          <div className="slider-header">
            <label htmlFor="steps">Daily Steps: <strong>{steps.toLocaleString()}</strong></label>
            <InfoTooltip>
              <strong>More steps = More carbs = Better performance preservation</strong>
              <br /><br />
              Higher step counts allow for more dietary carbohydrates, which helps preserve training performance and reduces hunger during your cut.
              <br /><br />
              <em>Tip: On average, 30 minutes of walking achieves approximately 5,000 steps for most people.</em>
            </InfoTooltip>
          </div>
          <input
            type="range"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            min={10000}
            max={15000}
            step={500}
            className="slider"
          />
          <div className="slider-labels">
            <span>10,000</span>
            <span>15,000</span>
          </div>
        </div>
        
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="trainingSessions">
              Training Sessions/Week
              <InfoTooltip>
                Olympic weightlifting sessions (typically 1.5-2.5 hours including rest periods). 
                Lower volume and longer rest compared to bodybuilding-style training.
              </InfoTooltip>
            </label>
            <input
              type="number"
              id="trainingSessions"
              value={trainingSessions}
              onChange={(e) => setTrainingSessions(Number(e.target.value))}
              min={2}
              max={12}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="cardioMinutes">
              Cardio Minutes/Week
              <InfoTooltip>
                Low-moderate intensity cardio (55-65% VO2max). 
                Examples: Brisk walking, easy cycling, or light rowing.
              </InfoTooltip>
            </label>
            <input
              type="number"
              id="cardioMinutes"
              value={cardioMinutes}
              onChange={(e) => setCardioMinutes(Number(e.target.value))}
              min={0}
              max={300}
              step={15}
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">🎯</span>
          Cut Parameters
        </h2>
        
        <div className="slider-group">
          <div className="slider-header">
            <label htmlFor="weightToLose">
              Target Weight Loss: <strong>{weightToLose}%</strong> body mass
            </label>
          </div>
          <input
            type="range"
            id="weightToLose"
            value={weightToLose}
            onChange={(e) => setWeightToLose(Number(e.target.value))}
            min={4}
            max={8}
            step={0.5}
            className="slider"
          />
          <div className="slider-labels">
            <span>4%</span>
            <span>8%</span>
          </div>
          <p className="example-text">
            Example: At {weight}kg, losing {weightToLose}% = <strong>{weightLossExample}kg</strong> total weight loss
          </p>
        </div>
        
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="risk">
              Risk Tolerance
              <InfoTooltip>
                <strong>Low:</strong> Conservative approach, prioritizes safety and performance maintenance. Results in a more aggressive deficit (shorter duration).
                <br /><br />
                <strong>Medium:</strong> Balanced approach for most athletes.
                <br /><br />
                <strong>High:</strong> For experienced cutters comfortable with larger weight fluctuations. Results in a less aggressive daily deficit.
              </InfoTooltip>
            </label>
            <select
              id="risk"
              value={risk}
              onChange={(e) => setRisk(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low (Conservative)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Aggressive)</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="refuelling">
              Refuelling Strategy
              <InfoTooltip>
                <strong>Steady:</strong> 3 weeks of rapid fat loss with more aggressive deficit, followed by progressive refuelling. Better for those who prefer getting the hard part done quickly.
                <br /><br />
                <strong>Rapid:</strong> 4 weeks of moderate deficit, followed by rapid refuelling closer to competition. More sustainable day-to-day but less buffer time.
              </InfoTooltip>
            </label>
            <select
              id="refuelling"
              value={refuelling}
              onChange={(e) => setRefuelling(e.target.value as 'steady' | 'rapid')}
            >
              <option value="steady">Steady Refuelling</option>
              <option value="rapid">Rapid Refuelling</option>
            </select>
          </div>
        </div>
        
        <div className="info-box refuelling-note">
          <span className="info-icon">💡</span>
          <div>
            <strong>Refuelling Strategy Note:</strong>
            <p>
              <strong>Steady</strong> = More aggressive initial deficit (3 weeks) but gradual, progressive refuelling phase.
              <br />
              <strong>Rapid</strong> = Less aggressive initial deficit (4 weeks) but faster refuelling closer to competition.
            </p>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">⏰</span>
          Schedule
        </h2>
        
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="wakeTime">Wake Time</label>
            <input
              type="time"
              id="wakeTime"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="trainingTime">Training Time</label>
            <input
              type="time"
              id="trainingTime"
              value={trainingTime}
              onChange={(e) => setTrainingTime(e.target.value)}
            />
          </div>
        </div>
      </section>

      <button type="submit" className="calculate-btn">
        Calculate Macros & Generate Meal Plan
      </button>
    </form>
  );
}

export default CalculatorForm;
