import { useNavigate } from "react-router-dom";
import { useFit } from "../context/FitContext";
import "./Home.css";

const HERO = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=500&fit=crop&q=80";

const QUOTES = [
  "The pain you feel today is the strength you feel tomorrow.",
  "Train insane or remain the same.",
  "Push yourself because no one else is going to do it for you.",
];

export default function Home() {
  const { totalCalories, queue, isLoggedIn } = useFit();
  const navigate = useNavigate();
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <main className="page">
      <div className="home">

        {/* Hero */}
        <div className="home__hero">
          <div className="home__hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
          <div className="home__hero-overlay" />
          <div className="home__hero-content">
            <p className="home__tagline">YOUR DAILY GRIND</p>
            <h1 className="home__title">READY TO<br />SWEAT?</h1>
            <p className="home__quote">"{quote}"</p>
            <div className="home__cta-group">
              <button className="btn btn--primary" onClick={() => navigate("/browse")}>
                Browse Exercises →
              </button>
              {!isLoggedIn && (
                <button className="btn btn--ghost" onClick={() => navigate("/login")}>
                  Login to Track
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="home__stats">
          <div className="home__stat"><span className="home__stat-val">{totalCalories}</span><span className="home__stat-lbl">Calories Queued</span></div>
          <div className="home__stat"><span className="home__stat-val">{queue.length}</span><span className="home__stat-lbl">In Queue</span></div>
          <div className="home__stat"><span className="home__stat-val">8</span><span className="home__stat-lbl">Exercises</span></div>
        </div>

        {/* Steps */}
        <div>
          <h2 className="section-title">HOW IT WORKS</h2>
          <div className="divider" />
          <div className="home__steps">
            {[
              { n: "01", t: "Browse",  d: "Explore exercises by muscle group" },
              { n: "02", t: "Queue",   d: "Add your picks to the session" },
              { n: "03", t: "Train",   d: "Mark each exercise as done" },
              { n: "04", t: "Review",  d: "See session stats and calories" },
            ].map(s => (
              <div className="home__step" key={s.n}>
                <span className="home__step-n">{s.n}</span>
                <h3 className="home__step-t">{s.t}</h3>
                <p className="home__step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
