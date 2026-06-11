import "./FallbackUI.css";

// Shown when ErrorBoundary catches a crash
export default function FallbackUI({ error }) {
  return (
    <div className="fallback">
      <div className="fallback__box">
        <span className="fallback__icon">⚡</span>
        <h2 className="fallback__title">Something broke</h2>
        <p className="fallback__msg">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button className="btn btn--primary" onClick={() => window.location.href = "/"}>
          Go Home
        </button>
      </div>
    </div>
  );
}
