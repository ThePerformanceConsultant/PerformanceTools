
import React, { useMemo } from 'react';
import './MealPlan.css';
import { MacroResults } from '../../utils/calculations';
import { generateMealPlan, Meal, formatTime, getTimeDifferenceHours } from '../../utils/mealPlanner';

interface MealPlanProps {
  results: MacroResults;
  wakeTime: string;
  trainingTime: string;
}

function MealPlan({ results, wakeTime, trainingTime }: MealPlanProps) {
  const mealPlan = useMemo(() => {
    return generateMealPlan(results, wakeTime, trainingTime);
  }, [results, wakeTime, trainingTime]);

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

  return (
    <div className="meal-plan">
      <div className="meal-plan-header">
        <h2>🍽️ Rapid Fat Loss Phase Sample Meal Plan</h2>
        <p className="meal-plan-subtitle">
          Optimized for your schedule: Wake {formatTime(wakeTime)} | Training {formatTime(trainingTime)}
        </p>
        {isEarlyTraining && (
          <div className="early-training-note">
            <span className="note-icon">⚡</span>
            Since you train within 4 hours of waking, your meal timing has been adjusted. 
            Have a lighter pre-training option and your main "breakfast" meal later in the day.
          </div>
        )}
      </div>

      <div className="meals-container">
        {mealPlan.map((meal, index) => (
          <MealCard key={index} meal={meal} mealNumber={index + 1} />
        ))}
      </div>

      <div className="totals-summary">
        <h3>Daily Totals</h3>
        <div className="totals-grid">
          <div className="total-item">
            <span className="total-value">{Math.round(totals.calories)}</span>
            <span className="total-label">Calories</span>
            <span className="total-target">Target: {results.calories}</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.protein)}g</span>
            <span className="total-label">Protein</span>
            <span className="total-target">Target: {results.protein}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.carbs)}g</span>
            <span className="total-label">Carbs</span>
            <span className="total-target">Target: {results.carbs}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.fats)}g</span>
            <span className="total-label">Fats</span>
            <span className="total-target">Target: {results.fats}g</span>
          </div>
          <div className="total-item">
            <span className="total-value">{Math.round(totals.fiber)}g</span>
            <span className="total-label">Fiber</span>
            <span className="total-target">Goal: 25-35g</span>
          </div>
        </div>
      </div>

      <div className="meal-plan-notes">
        <h3>📌 Important Notes</h3>
        <ul>
          <li>All weights are for <strong>cooked/prepared</strong> foods unless otherwise noted</li>
          <li>Pre-training meal should be consumed <strong>1-3 hours before</strong> your session</li>
          <li>Post-training meal should be consumed <strong>within 2 hours</strong> of finishing</li>
          <li>Distribute protein intake evenly across meals (aim for 25-40g per meal)</li>
          <li>Prioritize carbohydrates around training for performance</li>
          <li>Vegetables can be increased for satiety without significantly impacting calories</li>
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

export default MealPlan;
