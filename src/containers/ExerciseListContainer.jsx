import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFit, ALL_EXERCISES } from "../context/FitContext";
import ExerciseCard from "../components/ExerciseCard";
import "./ExerciseListContainer.css";

// ── SMART / Container Component ───────────────────────────────────────────────
// This component OWNS the logic:
//   - filtering by muscle group (local state)
//   - reading queue from Context
//   - passing addToQueue down to dumb ExerciseCard
// ExerciseCard doesn't know any of this — it just receives props

const MUSCLES = ["All", "Chest", "Legs", "Back", "Core", "Shoulders", "Arms"];

export default function ExerciseListContainer({ defaultMuscle = "All" }) {
  const { queue, addToQueue } = useFit();
  const navigate = useNavigate();

  // Local state: filter selection (state co-location — lives here because only this component needs it)
  const [activeFilter, setActiveFilter] = useState(defaultMuscle);

  // Derived state: filtered list computed from ALL_EXERCISES + activeFilter
  const filtered = activeFilter === "All"
    ? ALL_EXERCISES
    : ALL_EXERCISES.filter(e => e.muscle === activeFilter);

  const isInQueue = (id) => queue.some(e => e.id === id);

  const handleFilterChange = (muscle) => {
    setActiveFilter(muscle);
    // Update URL for nested routing
    if (muscle === "All") navigate("/browse");
    else navigate(`/browse/muscle/${muscle.toLowerCase()}`);
  };

  return (
    <div className="excontainer">
      {/* Header */}
      <div className="excontainer__header">
        <div>
          <h2 className="section-title">BROWSE EXERCISES</h2>
          <p className="excontainer__sub">{filtered.length} exercises · {queue.length} in queue</p>
        </div>
        {queue.length > 0 && (
          <button className="btn btn--primary" onClick={() => navigate("/session")}>
            Start Session ({queue.length}) →
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="excontainer__filters">
        {MUSCLES.map(m => (
          <button
            key={m}
            className={`excontainer__filter ${activeFilter === m ? "excontainer__filter--active" : ""}`}
            onClick={() => handleFilterChange(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid — passes props DOWN to dumb ExerciseCard */}
      <div className="excontainer__grid">
        {filtered.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onAdd={addToQueue}
            isInQueue={isInQueue(exercise.id)}
            onViewDetail={(id) => navigate(`/exercises/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}
