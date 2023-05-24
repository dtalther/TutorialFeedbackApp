import { Feedback } from "../typings/Feedback";
import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
export interface FeedbackItemProps {
  feedback: Feedback;
}

export default function FeedbackItem({ feedback }: FeedbackItemProps) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card reverse={true}>
      <div className="num-display">{feedback.rating}</div>
      <button onClick={() => deleteFeedback(feedback.id)} className="close">
        <FaTimes color="#ff6a95" />
      </button>
      <button onClick={() => editFeedback(feedback)} className="edit">
        <FaEdit color="#ff6a95" />
      </button>
      <div className="text-display">{feedback.text}</div>
    </Card>
  );
}
