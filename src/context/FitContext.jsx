import { createContext, useContext, useState, useEffect } from "react";

const FitContext = createContext();

export const ALL_EXERCISES = [
  { id: 1, name: "Push Ups",       muscle: "Chest",     sets: 3, reps: 15, calories: 8,  emoji: "💪", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&q=80" },
  { id: 2, name: "Squats",         muscle: "Legs",      sets: 4, reps: 12, calories: 10, emoji: "🦵", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=240&fit=crop&q=80" },
  { id: 3, name: "Pull Ups",       muscle: "Back",      sets: 3, reps: 10, calories: 9,  emoji: "🏋️", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=240&fit=crop&q=80" },
  { id: 4, name: "Plank",          muscle: "Core",      sets: 3, reps: 1,  calories: 5,  emoji: "🧱", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=240&fit=crop&q=80" },
  { id: 5, name: "Lunges",         muscle: "Legs",      sets: 3, reps: 12, calories: 7,  emoji: "🦿", image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=240&fit=crop&q=80" },
  { id: 6, name: "Shoulder Press", muscle: "Shoulders", sets: 3, reps: 12, calories: 8,  emoji: "🔝", image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=240&fit=crop&q=80" },
  { id: 7, name: "Bicep Curls",    muscle: "Arms",      sets: 3, reps: 15, calories: 6,  emoji: "🥊", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=240&fit=crop&q=80" },
  { id: 8, name: "Deadlift",       muscle: "Back",      sets: 4, reps: 8,  calories: 12, emoji: "⚡", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=240&fit=crop&q=80" },
];

export function FitProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Array state — persisted with localStorage + useEffect
  const [queue, setQueue] = useState(() => {
    try {
      const saved = localStorage.getItem("fitflow_queue");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Object state
  const [sessionStats, setSessionStats] = useState({
    duration: 0, totalSets: 0, caloriesBurned: 0, exercisesCompleted: 0,
  });

  // Browser storage rubric item — save queue on every change
  useEffect(() => {
    localStorage.setItem("fitflow_queue", JSON.stringify(queue));
  }, [queue]);

  // Fake auth — checks hardcoded credentials
  const login = (username, password) => {
    if (username === "fituser" && password === "fit123") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => { setIsLoggedIn(false); setQueue([]); };

  const addToQueue    = (ex) => { if (!queue.find((e) => e.id === ex.id)) setQueue([...queue, { ...ex, done: false }]); };
  const removeFromQueue = (id) => setQueue(queue.filter((e) => e.id !== id));
  const markDone      = (id) => setQueue(queue.map((e) => (e.id === id ? { ...e, done: true } : e)));

  const endSession = () => {
    const completed = queue.filter((e) => e.done);
    setSessionStats({
      duration:           queue.length * 4,
      totalSets:          completed.reduce((s, e) => s + e.sets, 0),
      caloriesBurned:     completed.reduce((s, e) => s + e.calories * e.sets, 0),
      exercisesCompleted: completed.length,
    });
    setQueue([]);
  };

  const resetSession = () =>
    setSessionStats({ duration: 0, totalSets: 0, caloriesBurned: 0, exercisesCompleted: 0 });

  // Derived state — computed, not stored
  const totalCalories = sessionStats.caloriesBurned;
  const queueCount    = queue.length;
  const allDone       = queue.length > 0 && queue.every((e) => e.done);

  return (
    <FitContext.Provider value={{
      isLoggedIn, login, logout,
      queue, addToQueue, removeFromQueue, markDone,
      sessionStats, endSession, resetSession,
      totalCalories, queueCount, allDone,
      exercises: ALL_EXERCISES,
    }}>
      {children}
    </FitContext.Provider>
  );
}

export function useFit() { return useContext(FitContext); }
