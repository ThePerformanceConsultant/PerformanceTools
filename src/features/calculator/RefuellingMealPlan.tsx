
import React, { useMemo, useState } from 'react';
import './RefuellingMealPlan.css';
import { RefuellingPhase } from '../../utils/calculations';
import { generateRefuellingMealPlan, Meal, formatTime, getTimeDifferenceHours } from '../../utils/mealPlanner';

interface RefuellingMealPlanProps {
  refuelling: RefuellingPhase;
  wakeTime: string;
  trainingTime: string;
}

function RefuellingMealPlan({ refuelling, wakeTime, trainingTime }: RefuellingMealPlanProps) {
  const [selectedWeek, setSelectedWeek] = useState<1 | 2>(1);
  const isDoubleWeek = refuelling.weeks === 2;
  
  const mealPlan = useMemo(() => {
    return generateRefuellingMealPlan(refuelling, selectedWeek, wakeTime, trainingTime);
  }, [refuelling, selectedWeek, wakeTime, trainingTime]);

  const totals = useMemo(() => {
    return mealPlan.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.totalCalories,
        protein: acc.protein + meal.totalProtein,
        carbs: acc.carbs + meal.totalCarbs,
        fats: acc.fats + meal.totalFats,
        fiber: acc.fiber + meal.totalFiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );
  }, [mealPlan]);

  const hoursUntilTraining = getTimeDifferenceHours(wakeTime, trainingTime);
  const isEarlyTraining = hoursUntilTraining >= 0 && hoursUntilTraining <= 4;

  const targetCalories = selectedWeek === 1 ? refuelling.week1Calories : (refuelling.week2Calories || refuelling.week1Calories);
  const targetCarbs = selectedWeek === 1 ? refuelling.week1Carbs : (refuelling.week2Carbs || refuelling.week1Carbs);
  const targetFats = selectedWeek === 1 ? refuelling.week1Fats : (refuelling.week2Fats || refuelling.week1Fats);

  return (
    <div className="refuelling-meal-plan">
      <div className="meal-plan-header">
        <h2>🍽️ Refuelling Phase Sample Meal Plan</h2>
        <p className="meal-plan-subtitle">
          Optimized for your schedule: Wake {formatTime(wakeTime)} | Training {formatTime(trainingTime)}
        </p>
        
        {isDoubleWeek && (
          <div className="week-selector">
            <button 
              className={`week-btn ${selectedWeek === 1 ? 'active' : ''}`}
              onClick={() => setSelectedWeek(1)}
            >
              Week {refuelling.startWeek}
            </button>
            <button 
              className={`week-btn ${selectedWeek === 2 ? 'active' : ''}`}
              onClick={() => setSelectedWeek(2)}
            >
              Week {refuelling.startWeek + 1}
            </button>
          </div>
        )}
        
        {isEarlyTraining && (
          <div className="early-training-note">
            <span className="note-icon">⚡</span>
            Since you train within 4 hours of waking, your meal timing has been adjusted.
          </div>
        )}
      </div>

      <div className="meals-container">
        {mealPlan.map((meal, index) => (
          <MealCard key={index} meal={meal} mealNumber={index + 1} />
        ))}
      </div>

      <div className="totals-summary refuelling">
        <h3>Daily Totals - {isDoubleWeek ? `Week ${refuelling.startWeek + selectedWeek - 1}` : `Week ${refuelling.startWeek}`}</h3>
        <div className="totals-grid">
          <div className="total-item">
            <span className="total-value">{Math.round(totals.calories)}</span>
            <span className="total-label">Calories</span>
            <span className="total-target">Target: {targetCalories}</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.protein)}g</span>
            <span className="total-label">Protein</span>
            <span className="total-target">Target: {refuelling.protein}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.carbs)}g</span>
            <span className="total-label">Carbs</span>
            <span className="total-target">Target: {targetCarbs}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.fats)}g</span>
            <span className="total-label">Fats</span>
            <span className="total-target">Target: {targetFats}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.fiber)}g</span>
            <span className="total-label">Fiber</span>
            <span className="total-target">Goal: 25-35g</span>
          </div>
        </div>
      </div>

      <div className="meal-plan-notes refuelling">
        <h3>📌 Refuelling Phase Notes</h3>
        <ul>
          <li>Higher fat foods (salmon, eggs, avocado, nuts) are included for hormonal support</li>
          <li>Increased carbohydrates will help restore muscle glycogen</li>
          <li>You may notice improved energy and training performance within days</li>
          <li>Some water weight gain is expected and beneficial for competition</li>
          <li>Maintain high vegetable intake for micronutrients and digestion</li>
        </ul>
      </div>
    </div>
  );
}

interface MealCardProps {
  meal: Meal;
  mealNumber: number;
}

function MealCard({ meal, mealNumber }: MealCardProps) {
  const mealTypeIcons: Record<string, string> = {
    'Breakfast': '🌅',
    'Pre-Training': '💪',
    'Post-Training': '🏋️',
    'Lunch': '☀️',
    'Dinner': '🌙',
    'Snack': '🍎',
  };

  return (
    <div className={`meal-card ${meal.isPreTraining ? 'pre-training' : ''} ${meal.isPostTraining ? 'post-training' : ''}`}>
      <div className="meal-header">
        <div className="meal-title">
          <span className="meal-icon">{mealTypeIcons[meal.type] || '🍽️'}</span>
          <div>
            <h4>{meal.name}</h4>
            <span className="meal-time">{meal.time}</span>
          </div>
        </div>
        <div className="meal-macros-summary">
          <span>{Math.round(meal.totalCalories)} kcal</span>
        </div>
      </div>
      
      <div className="meal-foods">
        {meal.foods.map((food, idx) => (
          <div key={idx} className="food-item">
            <div className="food-info">
              <span className="food-category">{food.category}</span>
              <span className="food-name">{food.name}</span>
              <span className="food-amount">{food.amount}g</span>
            </div>
            <div className="food-macros">
              <span className="macro-p" title="Protein">{Math.round(food.protein)}p</span>
              <span className="macro-c" title="Carbs">{Math.round(food.carbs)}c</span>
              <span className="macro-f" title="Fat">{Math.round(food.fat)}f</span>
              <span className="macro-fiber" title="Fiber">{Math.round(food.fiber)}fib</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="meal-totals">
        <div className="meal-total-item">
          <span className="label">Protein</span>
          <span className="value">{Math.round(meal.totalProtein)}g</span>
        </div>
        <div className="meal-total-item">
          <span className="label">Carbs</span>
          <span className="value">{Math.round(meal.totalCarbs)}g</span>
        </div>
        <div className="meal-total-item">
          <span className="label">Fats</span>
          <span className="value">{Math.round(meal.totalFats)}g</span>
        </div>
        <div className="meal-total-item">
          <span className="label">Fiber</span>
          <span className="value">{Math.round(meal.totalFiber)}g</span>
        </div>
      </div>
    </div>
  );
}

export default RefuellingMealPlan;
