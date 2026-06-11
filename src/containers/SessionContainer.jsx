import { useNavigate } from "react-router-dom";
import { useFit } from "../context/FitContext";
import "./SessionContainer.css";

// ── SMART / Container Component ───────────────────────────────────────────────
// Owns session logic: mark done, remove, end session
// Passes data down to a simple presentational list

export default function SessionContainer() {
  const { queue, markDone, removeFromQueue, endSession } = useFit();
  const navigate = useNavigate();

  const doneCount  = queue.filter(e => e.done).length;
  const totalCount = queue.length;
  const progress   = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const handleEndSession = () => {
    endSession();          // compute stats in context
    navigate("/summary");  // go to summary page
  };

  return (
    <div className="sessioncon">
      {/* Header */}
      <div className="sessioncon__header">
        <div>
          <h2 className="section-title">ACTIVE SESSION</h2>
          <p className="sessioncon__sub">{doneCount} of {totalCount} done</p>
        </div>
        <button className="btn btn--primary" onClick={handleEndSession} disabled={totalCount === 0}>
          End Session →
        </button>
      </div>

      {/* Progress bar */}
      <div className="sessioncon__progress-wrap">
        <div className="sessioncon__bar">
          <div className="sessioncon__fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="sessioncon__pct">{progress}%</span>
      </div>

      {/* Exercise rows */}
      {totalCount === 0 ? (
        <div className="sessioncon__empty">
          No exercises in queue. Go to Browse and add some!
        </div>
      ) : (
        <div className="sessioncon__list">
          {queue.map(ex => (
            <div key={ex.id} className={`sessioncon__row ${ex.done ? "sessioncon__row--done" : ""}`}>
              <div className="sessioncon__info">
                <span className="sessioncon__name">{ex.name}</span>
                <span className="sessioncon__detail">{ex.sets} sets × {ex.reps} reps · {ex.muscle}</span>
              </div>
              <div className="sessioncon__actions">
                {!ex.done ? (
                  <button className="btn btn--primary sessioncon__done" onClick={() => markDone(ex.id)}>✓ Done</button>
                ) : (
                  <span className="sessioncon__badge">Completed</span>
                )}
                <button className="sessioncon__remove" onClick={() => removeFromQueue(ex.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {doneCount === totalCount && totalCount > 0 && (
        <div className="sessioncon__complete">
          🎉 All done! Hit "End Session" to see your stats.
        </div>
      )}
    </div>
  );
}
