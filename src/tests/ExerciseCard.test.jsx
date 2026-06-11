import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";

// Fake exercise object for testing
const mockExercise = {
  id: 1,
  name: "Push Ups",
  muscle: "Chest",
  sets: 3,
  reps: 15,
  calories: 8,
  emoji: "💪",
  image: "https://example.com/pushups.jpg",
};

// ── UNIT TEST 1 ───────────────────────────────────────────────────────────────
// Does ExerciseCard render the exercise name correctly?
test("renders exercise name from props", () => {
  render(
    <MemoryRouter>
      <ExerciseCard
        exercise={mockExercise}
        onAdd={() => {}}
        isInQueue={false}
        onViewDetail={() => {}}
      />
    </MemoryRouter>
  );

  // Check if "Push Ups" appears on screen
  expect(screen.getByText("Push Ups")).toBeInTheDocument();
});

// ── UNIT TEST 2 ───────────────────────────────────────────────────────────────
// Does the "Add" button appear when exercise is NOT in queue?
test("shows Add button when exercise is not in queue", () => {
  const mockAdd = jest.fn(); // mock function to track if it gets called

  render(
    <MemoryRouter>
      <ExerciseCard
        exercise={mockExercise}
        onAdd={mockAdd}
        isInQueue={false}
        onViewDetail={() => {}}
      />
    </MemoryRouter>
  );

  // Find the add button
  const addButton = screen.getByText("+ Add");
  expect(addButton).toBeInTheDocument();

  // Click it and check the function was called
  fireEvent.click(addButton);
  expect(mockAdd).toHaveBeenCalledWith(mockExercise);
});
