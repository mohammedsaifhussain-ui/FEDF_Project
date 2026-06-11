import { useState } from "react";
import "./ExerciseCard.css";

// ── DUMB / Presentational Component ──────────────────────────────────────────
// This component only DISPLAYS data passed via props
// It has NO idea about Context, routing, or business logic
// The only local state it has is imgError — purely for UI display purposes

const MUSCLE_COLORS = {
  Chest: "#f97316", Legs: "#8b5cf6", Back: "#3b82f6",
  Core:  "#ec4899",  Shoulders: "#14b8a6", Arms: "#f59e0b",
};

export default function ExerciseCard({ exercise, onAdd, isInQueue, onViewDetail }) {
  const { name, muscle, sets, reps, calories, image, emoji } = exercise;
  const color = MUSCLE_COLORS[muscle] || "#888";
  const [imgError, setImgError] = useState(false);  // local UI state only

  return (
    <div className={`ecard ${isInQueue ? "ecard--queued" : ""}`}>

      {/* Image with emoji fallback */}
      <div className="ecard__img-wrap" style={{ borderBottom: `3px solid ${color}` }}>
        {!imgError ? (
          <img src={image} alt={name} className="ecard__img" onError={() => setImgError(true)} />
        ) : (
          <div className="ecard__fallback" style={{ background: `${color}18` }}>
            <span>{emoji}</span>
          </div>
        )}
        <span className="ecard__badge" style={{ background: color }}>{muscle}</span>
        {isInQueue && <div className="ecard__overlay"><span>✓ IN QUEUE</span></div>}
      </div>

      {/* Card body */}
      <div className="ecard__body">
        <h3 className="ecard__name">{name}</h3>

        <div className="ecard__stats">
          <div className="ecard__stat"><span className="ecard__val">{sets}</span><span className="ecard__lbl">Sets</span></div>
          <div className="ecard__sep" />
          <div className="ecard__stat"><span className="ecard__val">{reps}</span><span className="ecard__lbl">Reps</span></div>
          <div className="ecard__sep" />
          <div className="ecard__stat"><span className="ecard__val">{calories * sets}</span><span className="ecard__lbl">Cal</span></div>
        </div>

        <div className="ecard__actions">
          <button className="btn btn--ghost ecard__detail-btn" onClick={() => onViewDetail(exercise.id)}>
            Details
          </button>
          <button
            className={`btn ecard__add-btn ${isInQueue ? "ecard__add-btn--added" : "btn--primary"}`}
            onClick={() => !isInQueue && onAdd(exercise)}
            disabled={isInQueue}
          >
            {isInQueue ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
