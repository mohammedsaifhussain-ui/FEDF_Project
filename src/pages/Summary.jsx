import { useNavigate } from "react-router-dom";
import { useFit } from "../context/FitContext";
import SummaryCard from "../components/SummaryCard";

export default function Summary() {
  const { sessionStats, resetSession } = useFit();
  const navigate = useNavigate();

  const handleReset = () => {
    resetSession();
    navigate("/browse");
  };

  return (
    <main className="page">
      <SummaryCard sessionStats={sessionStats} onReset={handleReset} />
    </main>
  );
}
