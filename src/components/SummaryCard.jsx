import "./SummaryCard.css";

// DUMB component — only receives sessionStats as props, displays them
export default function SummaryCard({ sessionStats, onReset }) {
  const { duration, totalSets, caloriesBurned, exercisesCompleted } = sessionStats;

  const getMessage = () => {
    if (exercisesCompleted === 0) return "No exercises completed. Try again!";
    if (exercisesCompleted <= 2)  return "Good start! Keep pushing. 💪";
    if (exercisesCompleted <= 5)  return "Solid session! You're building the habit. 🔥";
    return "BEAST MODE. Absolutely crushed it. 🏆";
  };

  return (
    <div className="summary">
      <div className="summary__hero">
        <p className="summary__label">SESSION COMPLETE</p>
        <h2 className="summary__title">GREAT WORK.</h2>
        <p className="summary__msg">{getMessage()}</p>
      </div>

      <div className="summary__grid">
        <div className="summary__card summary__card--accent">
          <span className="summary__val">{exercisesCompleted}</span>
          <span className="summary__key">Exercises Done</span>
        </div>
        <div className="summary__card">
          <span className="summary__val">{caloriesBurned}</span>
          <span className="summary__key">Calories Burned</span>
        </div>
        <div className="summary__card">
          <span className="summary__val">{totalSets}</span>
          <span className="summary__key">Total Sets</span>
        </div>
        <div className="summary__card">
          <span className="summary__val">{duration}m</span>
          <span className="summary__key">Est. Duration</span>
        </div>
      </div>

      <button className="btn btn--primary btn--full" onClick={onReset}>
        Start New Session
      </button>
    </div>
  );
}
