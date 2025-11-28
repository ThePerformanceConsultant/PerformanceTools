
import React, { useState } from 'react';
import './App.css';
import CalculatorForm from './features/calculator/CalculatorForm';
import MacroResults from './features/calculator/MacroResults';
import RefuellingResults from './features/calculator/RefuellingResults';
import MealPlan from './features/calculator/MealPlan';
import RefuellingMealPlan from './features/calculator/RefuellingMealPlan';
import FluidGuidelines from './features/calculator/FluidGuidelines';
import { calculateMacros, calculateRefuellingPhase, MacroResults as MacroResultsType, RefuellingPhase, UserInputs } from './utils/calculations';

function App() {
  const [results, setResults] = useState<MacroResultsType | null>(null);
  const [refuellingPhase, setRefuellingPhase] = useState<RefuellingPhase | null>(null);
  const [inputs, setInputs] = useState<UserInputs | null>(null);

  const handleCalculate = (userInputs: UserInputs) => {
    const macros = calculateMacros(userInputs);
    const refuelling = calculateRefuellingPhase(macros, userInputs);
    setResults(macros);
    setRefuellingPhase(refuelling);
    setInputs(userInputs);
  };

  return (
    <div className="calculator-app">
      <header className="app-header">
        <h1>Olympic Weightlifting Weight Cut Calculator</h1>
        <p className="subtitle">Rapid Fat Loss & Refuelling Phase Macro Calculator</p>
      </header>
      
      <main className="app-main">
        <CalculatorForm onCalculate={handleCalculate} />
        
        {results && inputs && refuellingPhase && (
          <div className="results-container">
            <MacroResults results={results} inputs={inputs} />
            <MealPlan 
              results={results} 
              wakeTime={inputs.wakeTime} 
              trainingTime={inputs.trainingTime}
            />
            
            <RefuellingResults refuelling={refuellingPhase} inputs={inputs} tdee={results.tdee} />
            <RefuellingMealPlan 
              refuelling={refuellingPhase}
              wakeTime={inputs.wakeTime} 
              trainingTime={inputs.trainingTime}
            />
            
            <FluidGuidelines weightKg={inputs.weight} />
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p className="disclaimer">
          <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. 
          Consult with a qualified sports dietitian or healthcare professional before starting any 
          weight cut protocol. Individual results may vary.
        </p>
      </footer>
    </div>
  );
}

export default App;
