import FeedbackContext from "../context/FeedbackContext";
import { useContext } from "react";

function FeedbackStats() {
  const feedback = useContext(FeedbackContext)?.feedback;
  const avg = (
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length
  )
    .toFixed(1)
    .replace(/[.,]0$/, "");
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(+avg) ? 0 : avg}</h4>
    </div>
  );
}

export default FeedbackStats;
