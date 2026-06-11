import { useParams } from "react-router-dom";
import ExerciseListContainer from "../containers/ExerciseListContainer";

// Browse page handles both:
// /browse              → shows all exercises
// /browse/muscle/:group → nested route, pre-filters by muscle group

export default function Browse() {
  const { group } = useParams(); // from nested route /browse/muscle/:group

  // Capitalize first letter to match muscle names in data
  const defaultMuscle = group
    ? group.charAt(0).toUpperCase() + group.slice(1)
    : "All";

  return (
    <main className="page">
      <ExerciseListContainer defaultMuscle={defaultMuscle} />
    </main>
  );
}
