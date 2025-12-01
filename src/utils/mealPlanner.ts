import { MacroResults, RefuellingPhase } from './calculations';

interface FoodItem {
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable';
  per100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

const foodDatabase: FoodItem[] = [
  // Lean Proteins (low fat)
  { name: 'Chicken Breast (grilled)', category: 'protein', per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 } },
  { name: 'Egg Whites (cooked)', category: 'protein', per100g: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0 } },
  { name: 'Greek Yogurt (0% fat)', category: 'protein', per100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.7, fiber: 0 } },
  { name: 'Lean Beef (95% lean)', category: 'protein', per100g: { calories: 137, protein: 26, carbs: 0, fat: 4, fiber: 0 } },
  { name: 'White Fish (tilapia)', category: 'protein', per100g: { calories: 96, protein: 20, carbs: 0, fat: 1.7, fiber: 0 } },
  { name: 'Cottage Cheese (1% fat)', category: 'protein', per100g: { calories: 72, protein: 12, carbs: 2.7, fat: 1, fiber: 0 } },
  { name: 'Turkey Breast (roasted)', category: 'protein', per100g: { calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0 } },
  { name: 'Shrimp (cooked)', category: 'protein', per100g: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0 } },
  
  // Carbs (low fat, low protein)
  { name: 'White Rice (cooked)', category: 'carb', per100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 } },
  { name: 'Sweet Potato (baked)', category: 'carb', per100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 } },
  { name: 'Oats (dry weight)', category: 'carb', per100g: { calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10 } },
  { name: 'Potato (boiled)', category: 'carb', per100g: { calories: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8 } },
  { name: 'Quinoa (cooked)', category: 'carb', per100g: { calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8 } },
  { name: 'Banana', category: 'carb', per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 } },
  { name: 'Whole Wheat Bread', category: 'carb', per100g: { calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7 } },
  { name: 'Cream of Rice (cooked)', category: 'carb', per100g: { calories: 52, protein: 1, carbs: 11, fat: 0.2, fiber: 0.2 } },
  
  // Fat Sources
  { name: 'Olive Oil', category: 'fat', per100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 } },
  { name: 'Almonds', category: 'fat', per100g: { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12 } },
  { name: 'Avocado', category: 'fat', per100g: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 } },
  { name: 'Salmon (baked)', category: 'fat', per100g: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 } },
  { name: 'Whole Eggs (scrambled)', category: 'fat', per100g: { calories: 149, protein: 10, carbs: 1.6, fat: 11, fiber: 0 } },
  { name: 'Peanut Butter', category: 'fat', per100g: { calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 } },
  
  // Vegetables
  { name: 'Broccoli (steamed)', category: 'vegetable', per100g: { calories: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3 } },
  { name: 'Spinach (raw)', category: 'vegetable', per100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 } },
  { name: 'Mixed Berries', category: 'vegetable', per100g: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2 } },
  { name: 'Asparagus (cooked)', category: 'vegetable', per100g: { calories: 22, protein: 2.4, carbs: 4, fat: 0.2, fiber: 2 } },
  { name: 'Bell Peppers (raw)', category: 'vegetable', per100g: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 } },
  { name: 'Zucchini (cooked)', category: 'vegetable', per100g: { calories: 17, protein: 1.2, carbs: 3, fat: 0.3, fiber: 1 } },
  { name: 'Green Beans (cooked)', category: 'vegetable', per100g: { calories: 35, protein: 1.9, carbs: 8, fat: 0.3, fiber: 3.4 } },
  { name: 'Cucumber (raw)', category: 'vegetable', per100g: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 } },
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

// Lean protein sources for fat loss phase
const leanProteinSources = [
  'Chicken Breast (grilled)',
  'Egg Whites (cooked)',
  'White Fish (tilapia)',
  'Lean Beef (95% lean)',
  'Greek Yogurt (0% fat)',
  'Cottage Cheese (1% fat)',
  'Turkey Breast (roasted)',
  'Shrimp (cooked)',
];

// Lean protein sources for refuelling (still lean - fats added separately)
const refuellingProteinSources = [
  'Chicken Breast (grilled)',
  'Lean Beef (95% lean)',
  'Turkey Breast (roasted)',
  'White Fish (tilapia)',
  'Greek Yogurt (0% fat)',
  'Shrimp (cooked)',
];

// Low-protein carb sources (to minimize extra protein)
const carbSources = [
  'White Rice (cooked)',
  'Sweet Potato (baked)',
  'Potato (boiled)',
  'Cream of Rice (cooked)',
  'Banana',
];

// Secondary carb sources for high-carb meals
const secondaryCarbSources = [
  'Banana',
  'White Rice (cooked)',
  'Potato (boiled)',
  'Sweet Potato (baked)',
  'Cream of Rice (cooked)',
];

// Fat sources for refuelling
const fatSources = [
  'Olive Oil',
  'Avocado',
  'Almonds',
  'Salmon (baked)',
  'Whole Eggs (scrambled)',
  'Peanut Butter',
];

const vegSources = [
  'Broccoli (steamed)',
  'Asparagus (cooked)',
  'Green Beans (cooked)',
  'Bell Peppers (raw)',
  'Spinach (raw)',
  'Zucchini (cooked)',
];

function buildMealFromTarget(target: MealTarget, mealIndex: number, isRefuelling: boolean = false): Meal {
  const foods: FoodPortion[] = [];
  
  // Track cumulative macros
  let usedProtein = 0;
  let usedCarbs = 0;
  let usedFats = 0;
  
  // Step 1: Add protein source (always use lean sources)
  const proteinSourceList = isRefuelling ? refuellingProteinSources : leanProteinSources;
  const proteinSourceName = proteinSourceList[mealIndex % proteinSourceList.length];
  const proteinFood = getFood(proteinSourceName)!;
  
  // Calculate protein amount needed
  const targetProteinFromSource = target.protein * 0.9; // Aim for 90% from primary source
  const proteinGrams = Math.min(250, Math.max(50, Math.round((targetProteinFromSource / proteinFood.per100g.protein) * 100)));
  const proteinPortion = calculatePortion(proteinFood, proteinGrams);
  foods.push(proteinPortion);
  
  usedProtein += proteinPortion.protein;
  usedCarbs += proteinPortion.carbs;
  usedFats += proteinPortion.fat;
  
  // Step 2: Add carb source(s) - may need multiple for high carb targets
  let remainingCarbs = Math.max(0, target.carbs - usedCarbs);
  if (remainingCarbs > 10) {
    const carbSourceName = carbSources[mealIndex % carbSources.length];
    const carbFood = getFood(carbSourceName)!;
    
    // Dynamic max portion based on carb target - allow larger portions for high-carb meals
    const maxCarbPortion = target.carbs > 100 ? 550 : 400;
    
    const idealGrams = Math.round((remainingCarbs / carbFood.per100g.carbs) * 100);
    const carbGrams = Math.min(maxCarbPortion, Math.max(30, idealGrams));
    const carbPortion = calculatePortion(carbFood, carbGrams);
    foods.push(carbPortion);
    
    usedProtein += carbPortion.protein;
    usedCarbs += carbPortion.carbs;
    usedFats += carbPortion.fat;
    
    // If we still need significant carbs (hit the cap), add a second carb source
    remainingCarbs = Math.max(0, target.carbs - usedCarbs);
    if (remainingCarbs > 15 && idealGrams > maxCarbPortion) {
      // Use a different carb source (offset by 2 to get variety)
      const secondCarbIdx = (mealIndex + 2) % secondaryCarbSources.length;
      const secondCarbSourceName = secondaryCarbSources[secondCarbIdx];
      const secondCarbFood = getFood(secondCarbSourceName)!;
      
      const secondIdealGrams = Math.round((remainingCarbs / secondCarbFood.per100g.carbs) * 100);
      const secondCarbGrams = Math.min(250, Math.max(30, secondIdealGrams));
      
      if (secondCarbGrams >= 30) {
        const secondCarbPortion = calculatePortion(secondCarbFood, secondCarbGrams);
        foods.push(secondCarbPortion);
        
        usedProtein += secondCarbPortion.protein;
        usedCarbs += secondCarbPortion.carbs;
        usedFats += secondCarbPortion.fat;
      }
    }
  }
  
  // Step 3: Add fat source (for refuelling phase, or if fats are significantly under)
  const remainingFats = Math.max(0, target.fats - usedFats);
  if (isRefuelling && remainingFats > 3) {
    // Choose fat source based on meal index for variety
    const fatSourceName = fatSources[mealIndex % fatSources.length];
    const fatFood = getFood(fatSourceName)!;
    
    // For pure fats like olive oil, use smaller amounts
    let maxFatGrams = 60;
    if (fatSourceName === 'Olive Oil') {
      maxFatGrams = 20; // ~1.5 tbsp max
    } else if (fatSourceName === 'Almonds' || fatSourceName === 'Peanut Butter') {
      maxFatGrams = 40;
    }
    
    // Account for protein in fat sources
    const fatGrams = Math.min(maxFatGrams, Math.max(0, Math.round((remainingFats / fatFood.per100g.fat) * 100)));
    if (fatGrams >= 5) {
      const fatPortion = calculatePortion(fatFood, fatGrams);
      foods.push(fatPortion);
      
      usedProtein += fatPortion.protein;
      usedCarbs += fatPortion.carbs;
      usedFats += fatPortion.fat;
    }
  }
  
  // Step 4: Add vegetables (minimal macro impact, good for fiber/volume)
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
  
  // More even distribution for refuelling
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
      fats: fatsPerMeal * 0.7,
      name: 'Light Pre-Training',
      type: 'Pre-Training',
      time: formatTime(preTrainingTime),
      isPreTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal * 1.2,
      carbs: carbsAroundTraining * 0.7,
      fats: fatsPerMeal * 0.8,
      name: 'Post-Training Breakfast',
      type: 'Post-Training',
      time: formatTime(postTrainingTime),
      isPostTraining: true,
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.25,
      name: 'Lunch',
      type: 'Lunch',
      time: formatTime(lunchTime),
    });
    
    mealTargets.push({
      protein: proteinPerMeal,
      carbs: carbsOtherMeals * 0.5,
      fats: fatsPerMeal * 1.25,
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
  
  // Use different mealIndex offset for week 2 to get different food variety
  const indexOffset = week === 1 ? 10 : 16;
  return mealTargets.map((target, index) => buildMealFromTarget(target, index + indexOffset, true));
}
