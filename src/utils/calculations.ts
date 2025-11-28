
export interface UserInputs {
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female';
  steps: number;
  trainingSessions: number;
  cardioMinutes: number;
  weightToLose: number; // percentage
  risk: 'low' | 'medium' | 'high';
  refuelling: 'steady' | 'rapid';
  wakeTime: string;
  trainingTime: string;
}

export interface MacroResults {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  deficitPercent: number;
  weeklyWeightLoss: number;
  stepsCalories: number;
  trainingCaloriesDaily: number;
  cardioCaloriesDaily: number;
  neatCalories: number;
}

export interface RefuellingPhase {
  weeks: number;
  startWeek: number;
  week1Calories: number;
  week2Calories?: number;
  protein: number;
  week1Carbs: number;
  week2Carbs?: number;
  week1Fats: number;
  week2Fats?: number;
}

// Mifflin-St Jeor Equation for BMR
function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
}

// Calculate calories burned from steps
function calculateStepsCalories(steps: number, weight: number): number {
  const caloriesPerStep = 0.00035 * weight + 0.02;
  return Math.round(steps * caloriesPerStep);
}

// Calculate training calories
function calculateTrainingCalories(sessions: number, weight: number): number {
  const mets = 4;
  const minutesPerSession = 90;
  const weeklyCalories = sessions * mets * weight * (minutesPerSession / 60);
  return Math.round(weeklyCalories / 7);
}

// Calculate cardio calories
function calculateCardioCalories(minutes: number, weight: number): number {
  const mets = 5;
  const weeklyCalories = mets * weight * (minutes / 60);
  return Math.round(weeklyCalories / 7);
}

// Calculate NEAT
function calculateNEAT(weight: number, steps: number): number {
  const baseNeat = weight * 3;
  const stepAdjustment = (steps - 5000) * 0.01;
  return Math.round(baseNeat + Math.max(0, stepAdjustment));
}

// Calculate deficit percentage based on inputs
function calculateDeficitPercent(inputs: UserInputs): number {
  const riskScore = inputs.risk === 'low' ? 1 : inputs.risk === 'medium' ? 0.5 : 0;
  const weightScore = 1 - (inputs.weightToLose - 4) / 4;
  const refuelScore = inputs.refuelling === 'steady' ? 1 : 0;
  const combinedScore = (riskScore * 0.35 + weightScore * 0.35 + refuelScore * 0.3);
  const deficitPercent = 30 + combinedScore * 20;
  return Math.round(deficitPercent);
}

export function calculateMacros(inputs: UserInputs): MacroResults {
  const bmr = calculateBMR(inputs.weight, inputs.height, inputs.age, inputs.gender);
  const stepsCalories = calculateStepsCalories(inputs.steps, inputs.weight);
  const trainingCaloriesDaily = calculateTrainingCalories(inputs.trainingSessions, inputs.weight);
  const cardioCaloriesDaily = calculateCardioCalories(inputs.cardioMinutes, inputs.weight);
  const neatCalories = calculateNEAT(inputs.weight, inputs.steps);
  
  const estimatedIntake = bmr * 0.7;
  const tef = Math.round(estimatedIntake * 0.1);
  
  const tdee = bmr + stepsCalories + trainingCaloriesDaily + cardioCaloriesDaily + neatCalories + tef;
  
  const deficitPercent = calculateDeficitPercent(inputs);
  const calories = Math.round(tdee * (1 - deficitPercent / 100));
  
  const weightLbs = inputs.weight * 2.205;
  const protein = Math.round(weightLbs);
  const fats = Math.round(inputs.weight * 0.35);
  
  const proteinCalories = protein * 4;
  const fatCalories = fats * 9;
  const remainingCalories = calories - proteinCalories - fatCalories;
  const carbs = Math.max(0, Math.round(remainingCalories / 4));
  
  const dailyDeficit = tdee - calories;
  const weeklyDeficit = dailyDeficit * 7;
  const weeklyWeightLoss = Math.round((weeklyDeficit / 7700) * 10) / 10;
  
  return {
    bmr,
    tdee,
    calories,
    protein,
    carbs,
    fats,
    deficitPercent,
    weeklyWeightLoss,
    stepsCalories,
    trainingCaloriesDaily,
    cardioCaloriesDaily,
    neatCalories,
  };
}

export function calculateRefuellingPhase(results: MacroResults, inputs: UserInputs): RefuellingPhase {
  const rapidFatLossWeeks = inputs.refuelling === 'steady' ? 3 : 4;
  const refuellingWeeks = inputs.refuelling === 'steady' ? 2 : 1;
  const startWeek = rapidFatLossWeeks + 1;
  
  const maintenanceCalories = Math.round(results.tdee * 0.95); // Maintenance - 5%
  const protein = results.protein; // Same as fat loss phase
  const fats = Math.round(inputs.weight * 0.6); // 0.6g per kg
  
  const proteinCalories = protein * 4;
  const fatCalories = fats * 9;
  
  if (refuellingWeeks === 2) {
    const midpointCalories = Math.round((results.calories + maintenanceCalories) / 2);
    const week1Carbs = Math.max(0, Math.round((midpointCalories - proteinCalories - fatCalories) / 4));
    const week2Carbs = Math.max(0, Math.round((maintenanceCalories - proteinCalories - fatCalories) / 4));
    
    return {
      weeks: 2,
      startWeek,
      week1Calories: midpointCalories,
      week2Calories: maintenanceCalories,
      protein,
      week1Carbs,
      week2Carbs,
      week1Fats: fats,
      week2Fats: fats,
    };
  } else {
    const carbs = Math.max(0, Math.round((maintenanceCalories - proteinCalories - fatCalories) / 4));
    
    return {
      weeks: 1,
      startWeek,
      week1Calories: maintenanceCalories,
      protein,
      week1Carbs: carbs,
      week1Fats: fats,
    };
  }
}
