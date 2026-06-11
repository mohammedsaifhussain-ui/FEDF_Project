import SessionContainer from "../containers/SessionContainer";

// Protected route — ProtectedRoute in App.jsx handles the guard
// This page just renders the smart SessionContainer
export default function Session() {
  return (
    <main className="page">
      <SessionContainer />
    </main>
  );
}
