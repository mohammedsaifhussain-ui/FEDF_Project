import { useParams, useNavigate } from "react-router-dom";
import { useFit, ALL_EXERCISES } from "../context/FitContext";
import "./ExerciseDetail.css";

// Dynamic route: /exercises/:id
// useParams() reads the :id from the URL

export default function ExerciseDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { addToQueue, queue } = useFit();

  // Find the exercise by id from URL param
  const exercise = ALL_EXERCISES.find(e => e.id === parseInt(id));
  const isInQueue = queue.some(e => e.id === exercise?.id);

  // If ID doesn't exist in data, show not found
  if (!exercise) {
    return (
      <main className="page">
        <div className="detail__notfound">
          <h2>Exercise not found</h2>
          <button className="btn btn--primary" onClick={() => navigate("/browse")}>Back to Browse</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="detail">
        <button className="detail__back btn btn--ghost" onClick={() => navigate("/browse")}>
          ← Back
        </button>

        <div className="detail__hero">
          <img src={exercise.image} alt={exercise.name} className="detail__img" />
          <div className="detail__overlay" />
          <div className="detail__hero-content">
            <span className="detail__muscle">{exercise.muscle}</span>
            <h1 className="detail__name">{exercise.name}</h1>
          </div>
        </div>

        <div className="detail__body">
          <div className="detail__stats">
            <div className="detail__stat"><span className="detail__val">{exercise.sets}</span><span className="detail__lbl">Sets</span></div>
            <div className="detail__stat"><span className="detail__val">{exercise.reps}</span><span className="detail__lbl">Reps</span></div>
            <div className="detail__stat"><span className="detail__val">{exercise.calories * exercise.sets}</span><span className="detail__lbl">Calories</span></div>
          </div>

          <p className="detail__desc">
            <strong>{exercise.name}</strong> targets the <strong>{exercise.muscle}</strong> muscle group.
            Complete {exercise.sets} sets of {exercise.reps} reps with proper form and controlled movement.
            Estimated burn: {exercise.calories * exercise.sets} calories per full set sequence.
          </p>

          <button
            className={`btn btn--full ${isInQueue ? "" : "btn--primary"}`}
            onClick={() => !isInQueue && addToQueue(exercise)}
            disabled={isInQueue}
          >
            {isInQueue ? "✓ Already in Queue" : "+ Add to Session"}
          </button>
        </div>
      </div>
    </main>
  );
}
