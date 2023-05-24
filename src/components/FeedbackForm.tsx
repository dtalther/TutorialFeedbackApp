import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { Feedback } from "../typings/Feedback";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage("");
    } else if (e.target.value.trim().length < 10) {
      setBtnDisabled(true);
      setMessage("Text must be atleast 10 characters");
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback: Feedback = {
        text,
        rating,
        id: "",
      };
      if (feedbackEdit.edit) {
        newFeedback.id = feedbackEdit.item.id;
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        newFeedback.id = uuidv4();
        addFeedback(newFeedback);
      }
      setText("");
      setBtnDisabled(true);
    }
  };

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating: number) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" version="primary" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
