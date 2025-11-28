
import { MacroResults, RefuellingPhase } from './calculations';

interface FoodItem {
  name: string;
  category: 'protein' | 'carb' | 'vegetable';
  per100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

const foodDatabase: FoodItem[] = [
  // Proteins
  { name: 'Chicken Breast (grilled)', category: 'protein', per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 } },
  { name: 'Egg Whites (cooked)', category: 'protein', per100g: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0 } },
  { name: 'Greek Yogurt (0% fat)', category: 'protein', per100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.7, fiber: 0 } },
  { name: 'Lean Beef (95% lean)', category: 'protein', per100g: { calories: 137, protein: 26, carbs: 0, fat: 4, fiber: 0 } },
  { name: 'White Fish (tilapia)', category: 'protein', per100g: { calories: 96, protein: 20, carbs: 0, fat: 1.7, fiber: 0 } },
  { name: 'Cottage Cheese (1% fat)', category: 'protein', per100g: { calories: 72, protein: 12, carbs: 2.7, fat: 1, fiber: 0 } },
  { name: 'Turkey Breast (roasted)', category: 'protein', per100g: { calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0 } },
  { name: 'Shrimp (cooked)', category: 'protein', per100g: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0 } },
  { name: 'Salmon (baked)', category: 'protein', per100g: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 } },
  { name: 'Whole Eggs (scrambled)', category: 'protein', per100g: { calories: 149, protein: 10, carbs: 1.6, fat: 11, fiber: 0 } },
  
  // Carbs
  { name: 'White Rice (cooked)', category: 'carb', per100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 } },
  { name: 'Oats (dry weight)', category: 'carb', per100g: { calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10 } },
  { name: 'Sweet Potato (baked)', category: 'carb', per100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 } },
  { name: 'Banana', category: 'carb', per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 } },
  { name: 'Whole Wheat Bread', category: 'carb', per100g: { calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7 } },
  { name: 'Quinoa (cooked)', category: 'carb', per100g: { calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8 } },
  { name: 'Potato (boiled)', category: 'carb', per100g: { calories: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8 } },
  { name: 'Cream of Rice (cooked)', category: 'carb', per100g: { calories: 52, protein: 1, carbs: 11, fat: 0.2, fiber: 0.2 } },
  
  // Vegetables
  { name: 'Broccoli (steamed)', category: 'vegetable', per100g: { calories: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3 } },
  { name: 'Spinach (raw)', category: 'vegetable', per100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 } },
  { name: 'Mixed Berries', category: 'vegetable', per100g: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2 } },
  { name: 'Asparagus (cooked)', category: 'vegetable', per100g: { calories: 22, protein: 2.4, carbs: 4, fat: 0.2, fiber: 2 } },
  { name: 'Bell Peppers (raw)', category: 'vegetable', per100g: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 } },
  { name: 'Zucchini (cooked)', category: 'vegetable', per100g: { calories: 17, protein: 1.2, carbs: 3, fat: 0.3, fiber: 1 } },
  { name: 'Green Beans (cooked)', category: 'vegetable', per100g: { calories: 35, protein: 1.9, carbs: 8, fat: 0.3, fiber: 3.4 } },
  { name: 'Cucumber (raw)', category: 'vegetable', per100g: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 } },
  
  // Fats (for refuelling phase)
  { name: 'Avocado', category: 'vegetable', per100g: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 } },
  { name: 'Almonds', category: 'vegetable', per100g: { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12 } },
  { name: 'Olive Oil (1 tbsp = 14g)', category: 'vegetable', per100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 } },
];

export interface FoodPortion {
  name: string;
  category: string;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Meal {
  name: string;
  type: string;
  time: string;
  foods: FoodPortion[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalFiber: number;
  isPreTraining?: boolean;
  isPostTraining?: boolean;
}

interface MealTarget {
  protein: number;
  carbs: number;
  fats: number;
  name: string;
  type: string;
  time: string;
  isPreTraining?: boolean;
  isPostTraining?: boolean;
}

function getFood(name: string): FoodItem | undefined {
  return foodDatabase.find(f => f.name === name);
}

function calculatePortion(food: FoodItem, grams: number): FoodPortion {
  const multiplier = grams / 100;
  return {
    name: food.name,
    category: food.category,
    amount: Math.round(grams),
    calories: food.per100g.calories * multiplier,
    protein: food.per100g.protein * multiplier,
    carbs: food.per100g.carbs * multiplier,
    fat: food.per100g.fat * multiplier,
    fiber: food.per100g.fiber * multiplier,
  };
}

export function getTimeDifferenceHours(time1: string, time2: string): number {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);
  const minutes1 = h1 * 60 + m1;
  const minutes2 = h2 * 60 + m2;
  return (minutes2 - minutes1) / 60;
}

function addHoursToTime(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  let newHours = h + Math.floor(hours);
  let newMinutes = m + Math.round((hours % 1) * 60);
  if (newMinutes >= 60) {
    newHours++;
    newMinutes -= 60;
  }
  if (newHours >= 24) newHours -= 24;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function buildMealFromTarget(target: MealTarget, mealIndex: number, isRefuelling: boolean = false): Meal {
  const foods: FoodPortion[] = [];
  let remainingProtein = target.protein;
  let remainingCarbs = target.carbs;
  let remainingFats = target.fats;
  
  // Protein sources rotation
  const proteinSources = isRefuelling 
    ? ['Chicken Breast (grilled)', 'Salmon (baked)', 'Lean Beef (95% lean)', 'Whole Eggs (scrambled)']
    : ['Chicken Breast (grilled)', 'Egg Whites (cooked)', 'White Fish (tilapia)', 'Lean Beef (95% lean)', 'Greek Yogurt (0% fat)', 'Cottage Cheese (1% fat)'];
  
  const carbSources = ['White Rice (cooked)', 'Sweet Potato (baked)', 'Oats (dry weight)', 'Potato (boiled)', 'Quinoa (cooked)', 'Banana'];
  const vegSources = ['Broccoli (steamed)', 'Asparagus (cooked)', 'Green Beans (cooked)', 'Bell Peppers (raw)', 'Spinach (raw)', 'Mixed Berries'];
  
  // Select protein source based on meal
  const proteinSourceName = proteinSources[mealIndex % proteinSources.length];
  const proteinFood = getFood(proteinSourceName)!;
  const proteinGrams = Math.round((remainingProtein / proteinFood.per100g.protein) * 100);
  const proteinPortion = calculatePortion(proteinFood, Math.min(proteinGrams, 300));
  foods.push(proteinPortion);
  
  remainingProtein -= proteinPortion.protein;
  remainingCarbs -= proteinPortion.carbs;
  remainingFats -= proteinPortion.fat;
  
  // Select carb source
  if (remainingCarbs > 5) {
    const carbSourceName = carbSources[mealIndex % carbSources.length];
    const carbFood = getFood(carbSourceName)!;
    const carbGrams = Math.round((remainingCarbs / carbFood.per100g.carbs) * 100);
    const carbPortion = calculatePortion(carbFood, Math.max(0, Math.min(carbGrams, 350)));
    if (carbPortion.amount > 0) {
      foods.push(carbPortion);
      remainingCarbs -= carbPortion.carbs;
      remainingFats -= carbPortion.fat;
    }
  }
  
  // Add fat source for refuelling phase if needed
  if (isRefuelling && remainingFats > 5) {
    const fatSources = ['Avocado', 'Almonds', 'Olive Oil (1 tbsp = 14g)'];
    const fatSourceName = fatSources[mealIndex % fatSources.length];
    const fatFood = getFood(fatSourceName)!;
    const fatGrams = Math.round((remainingFats / fatFood.per100g.fat) * 100);
    const fatPortion = calculatePortion(fatFood, Math.max(0, Math.min(fatGrams, 100)));
    if (fatPortion.amount > 0) {
      foods.push(fatPortion);
      remainingFats -= fatPortion.fat;
    }
  }
  
  // Add vegetables
  const vegSourceName = vegSources[mealIndex % vegSources.length];
  const vegFood = getFood(vegSourceName)!;
  const vegPortion = calculatePortion(vegFood, 100);
  foods.push(vegPortion);
  
  return {
    name: target.name,
    type: target.type,
    time: target.time,
    foods,
    totalCalories: foods.reduce((sum, f) => sum + f.calories, 0),
    totalProtein: foods.reduce((sum, f) => sum + f.protein, 0),
    totalCarbs: foods.reduce((sum, f) => sum + f.carbs, 0),
    totalFats: foods.reduce((sum, f) => sum + f.fat, 0),
    totalFiber: foods.reduce((sum, f) => sum + f.fiber, 0),
    isPreTraining: target.isPreTraining,
    isPostTraining: target.isPostTraining,
  };
}

export function generateMealPlan(results: MacroResults, wakeTime: string, trainingTime: string): Meal[] {
  const targetProtein = results.protein;
  const targetCarbs = results.carbs;
  const targetFats = results.fats;
  
  const hoursToTraining = getTimeDifferenceHours(wakeTime, trainingTime);
  const isEarlyTraining = hoursToTraining >= 0 && hoursToTraining <= 4;
  
  const mealTargets: MealTarget[] = [];
  
  // Distribute macros across 4 meals
  // Prioritize carbs around training (60% pre/post, 40% other meals)
  const proteinPerMeal = targetProtein / 4;
  const carbsAroundTraining = targetCarbs * 0.6;
  const carbsOtherMeals = targetCarbs * 0.4;
  const fatsPerMeal = targetFats / 4;
  
  if (isEarlyTraining) {
    const preTrainingTime = addHoursToTime(trainingTime, -1);
    const postTrainingTime = addHoursToTime(trainingTime, 2);
    const lunchTime = addHoursToTime(postTrainingTime, 3);
    const dinnerTime = addHoursToTime(lunchTime, 4);
    
    // Pre-training (lighter, 20% of protein, 25% of training carbs)
    mealTargets.push({
      protein: proteinPerMeal * 0.8,
      carbs: carbsAroundTraining * 0.25,
      fats: fatsPerMeal * 0.5,
      name: 'Light Pre-Training',
      type: 'Pre-Training',
      time: formatTime(preTrainingTime),
      isPreTraining: true,
    });
    
    // Post-training (larger, 30% of protein, 35% of training carbs)
    mealTargets.push({
      protein: proteinPerMeal * 1.2,
      carbs: carbsAroundTraining * 0.75,
      fats: fatsPerMeal * 0.5,
      name: 'Post-Training Breakfast',
      type: 'Post-Training',
      time: formatTime(postTrainingTime),
      isPostTraining: true,
    });
    
    // Lunch (25% of protein, 50% of other carbs)
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.5,
      name: 'Lunch',
      type: 'Lunch',
      time: formatTime(lunchTime),
    });
    
    // Dinner (25% of protein, 50% of other carbs)
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.5,
      name: 'Dinner',
      type: 'Dinner',
      time: formatTime(dinnerTime),
    });
  } else {
    const breakfastTime = addHoursToTime(wakeTime, 0.5);
    const preTrainingTime = addHoursToTime(trainingTime, -2);
    const postTrainingTime = addHoursToTime(trainingTime, 2);
    const snackTime = addHoursToTime(postTrainingTime, 3);
    
    // Breakfast
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal,
      name: 'Breakfast',
      type: 'Breakfast',
      time: formatTime(breakfastTime),
    });
    
    // Pre-training / Lunch
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsAroundTraining * 0.45,
      fats: fatsPerMeal,
      name: 'Lunch / Pre-Training',
      type: 'Pre-Training',
      time: formatTime(preTrainingTime),
      isPreTraining: true,
    });
    
    // Post-training / Dinner
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsAroundTraining * 0.55,
      fats: fatsPerMeal,
      name: 'Dinner / Post-Training',
      type: 'Post-Training',
      time: formatTime(postTrainingTime),
      isPostTraining: true,
    });
    
    // Evening Snack
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal,
      name: 'Evening Snack',
      type: 'Snack',
      time: formatTime(snackTime),
    });
  }
  
  return mealTargets.map((target, index) => buildMealFromTarget(target, index, false));
}

export function generateRefuellingMealPlan(
  refuelling: RefuellingPhase,
  week: 1 | 2,
  wakeTime: string,
  trainingTime: string
): Meal[] {
  const targetProtein = refuelling.protein;
  const targetCarbs = week === 1 ? refuelling.week1Carbs : (refuelling.week2Carbs || refuelling.week1Carbs);
  const targetFats = week === 1 ? refuelling.week1Fats : (refuelling.week2Fats || refuelling.week1Fats);
  
  const hoursToTraining = getTimeDifferenceHours(wakeTime, trainingTime);
  const isEarlyTraining = hoursToTraining >= 0 && hoursToTraining <= 4;
  
  const mealTargets: MealTarget[] = [];
  
  const proteinPerMeal = targetProtein / 4;
  const carbsAroundTraining = targetCarbs * 0.55;
  const carbsOtherMeals = targetCarbs * 0.45;
  const fatsPerMeal = targetFats / 4;
  
  if (isEarlyTraining) {
    const preTrainingTime = addHoursToTime(trainingTime, -1);
    const postTrainingTime = addHoursToTime(trainingTime, 2);
    const lunchTime = addHoursToTime(postTrainingTime, 3);
    const dinnerTime = addHoursToTime(lunchTime, 4);
    
    mealTargets.push({
      protein: proteinPerMeal * 0.8,
      carbs: carbsAroundTraining * 0.3,
      fats: fatsPerMeal * 0.5,
      name: 'Light Pre-Training',
      type: 'Pre-Training',
      time: formatTime(preTrainingTime),
      isPreTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal * 1.2,
      carbs: carbsAroundTraining * 0.7,
      fats: fatsPerMeal * 0.5,
      name: 'Post-Training Breakfast',
      type: 'Post-Training',
      time: formatTime(postTrainingTime),
      isPostTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.5,
      name: 'Lunch',
      type: 'Lunch',
      time: formatTime(lunchTime),
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.5,
      name: 'Dinner',
      type: 'Dinner',
      time: formatTime(dinnerTime),
    });
  } else {
    const breakfastTime = addHoursToTime(wakeTime, 0.5);
    const preTrainingTime = addHoursToTime(trainingTime, -2);
    const postTrainingTime = addHoursToTime(trainingTime, 2);
    const snackTime = addHoursToTime(postTrainingTime, 3);
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal,
      name: 'Breakfast',
      type: 'Breakfast',
      time: formatTime(breakfastTime),
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsAroundTraining * 0.45,
      fats: fatsPerMeal,
      name: 'Lunch / Pre-Training',
      type: 'Pre-Training',
      time: formatTime(preTrainingTime),
      isPreTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsAroundTraining * 0.55,
      fats: fatsPerMeal,
      name: 'Dinner / Post-Training',
      type: 'Post-Training',
      time: formatTime(postTrainingTime),
      isPostTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal,
      name: 'Evening Snack',
      type: 'Snack',
      time: formatTime(snackTime),
    });
  }
  
  return mealTargets.map((target, index) => buildMealFromTarget(target, index + 4, true));
}
