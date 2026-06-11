import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FitProvider } from "../context/FitContext";
import ExerciseListContainer from "../containers/ExerciseListContainer";

// ── INTEGRATION TEST ──────────────────────────────────────────────────────────
// Tests that ExerciseListContainer (smart) correctly passes data
// down to multiple ExerciseCard (dumb) components
//
// This is an INTEGRATION test because it tests TWO components working together:
// ExerciseListContainer + ExerciseCard

test("ExerciseListContainer renders all exercise cards", () => {
  render(
    <MemoryRouter>
      <FitProvider>
        <ExerciseListContainer defaultMuscle="All" />
      </FitProvider>
    </MemoryRouter>
  );

  // All 8 exercises should appear on screen
  expect(screen.getByText("Push Ups")).toBeInTheDocument();
  expect(screen.getByText("Squats")).toBeInTheDocument();
  expect(screen.getByText("Deadlift")).toBeInTheDocument();

  // All 8 Add buttons should be present
  const addButtons = screen.getAllByText("+ Add");
  expect(addButtons.length).toBe(8);
});
