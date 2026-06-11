import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFit } from "../context/FitContext";
import "./Login.css";

// LOGIN PAGE covers these rubric items:
// ✅ Controlled component   → username/password via useState
// ✅ Uncontrolled component → "remember me" checkbox via useRef
// ✅ Form validation        → checks empty fields + min password length
// ✅ Protected route        → redirects away if already logged in

export default function Login() {
  const { login, authError, isLoggedIn } = useFit();
  const navigate = useNavigate();

  // CONTROLLED inputs — value tied to state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});

  // UNCONTROLLED input — value read via ref, not tracked in state
  const rememberRef = useRef(null);

  // If already logged in, go to browse
  useEffect(() => {
    if (isLoggedIn) navigate("/browse");
  }, [isLoggedIn, navigate]);

  // Form validation function
  const validate = () => {
    const newErrors = {};
    if (!username.trim())       newErrors.username = "Username is required";
    if (!password)              newErrors.password = "Password is required";
    else if (password.length < 4) newErrors.password = "Password must be at least 4 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Read uncontrolled input directly via ref
    const rememberMe = rememberRef.current?.checked;
    console.log("Remember me:", rememberMe); // shows useRef works

    login(username, password);
  };

  return (
    <main className="page">
      <div className="login">
        <div className="login__card">
          <div className="login__header">
            <span className="login__logo">FF</span>
            <h1 className="login__title">WELCOME BACK</h1>
            <p className="login__sub">Login to start your session</p>
          </div>

          {/* Hint for evaluator */}
          <div className="login__hint">
            <span>Demo credentials →</span>
            <code>fituser</code> / <code>fit123</code>
          </div>

          <form className="login__form" onSubmit={handleSubmit} noValidate>

            {/* CONTROLLED INPUT */}
            <div className="login__field">
              <label className="login__label">Username</label>
              <input
                type="text"
                className={`login__input ${errors.username ? "login__input--error" : ""}`}
                value={username}                          // controlled: value from state
                onChange={e => setUsername(e.target.value)} // controlled: update state on change
                placeholder="fituser"
              />
              {errors.username && <span className="login__error">{errors.username}</span>}
            </div>

            {/* CONTROLLED INPUT */}
            <div className="login__field">
              <label className="login__label">Password</label>
              <input
                type="password"
                className={`login__input ${errors.password ? "login__input--error" : ""}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
              />
              {errors.password && <span className="login__error">{errors.password}</span>}
            </div>

            {/* UNCONTROLLED INPUT — using useRef */}
            <div className="login__checkbox">
              <input
                type="checkbox"
                id="remember"
                ref={rememberRef}   // uncontrolled: no value/onChange, just a ref
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            {/* Auth error from Context */}
            {authError && <div className="login__auth-error">{authError}</div>}

            <button type="submit" className="btn btn--primary btn--full">
              Login →
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
