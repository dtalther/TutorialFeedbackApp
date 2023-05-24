import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackList() {
  const { feedback } = useContext(FeedbackContext);
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback</p>;
  }
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
}
