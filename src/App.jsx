import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FitProvider } from "./context/FitContext";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar        from "./components/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home           from "./pages/Home";
import Login          from "./pages/Login";
import Browse         from "./pages/Browse";
import ExerciseDetail from "./pages/ExerciseDetail";
import Session        from "./pages/Session";
import Summary        from "./pages/Summary";

import "./App.css";

export default function App() {
  return (
    // FitProvider wraps everything — Context available everywhere
    <FitProvider>
      <BrowserRouter>
        {/* ErrorBoundary wraps all routes — catches any render crash */}
        <ErrorBoundary>
          <NavBar />
          <Routes>
            {/* Public routes */}
            <Route path="/"        element={<Home />} />
            <Route path="/login"   element={<Login />} />

            {/* Browse + dynamic nested route */}
            <Route path="/browse"  element={<Browse />} />
            <Route path="/browse/muscle/:group" element={<Browse />} />  {/* nested */}
            <Route path="/exercises/:id"        element={<ExerciseDetail />} /> {/* dynamic */}

            {/* Protected routes — must be logged in */}
            <Route path="/session" element={
              <ProtectedRoute><Session /></ProtectedRoute>
            } />
            <Route path="/summary" element={
              <ProtectedRoute><Summary /></ProtectedRoute>
            } />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </FitProvider>
  );
}
