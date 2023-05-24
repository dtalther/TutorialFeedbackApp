import React from "react";
import { useState, createContext } from "react";
import {
  AddFunction,
  DeleteFunction,
  EditFunction,
  Feedback,
} from "../typings/Feedback";
type FeedbackContextType = {
  children: React.ReactNode;
};
type editFeedbackType = {
  item: Feedback;
  edit: boolean;
};
interface ContextType {
  feedback: Feedback[];
  deleteFeedback: DeleteFunction;
  addFeedback: AddFunction;
  editFeedback: EditFunction;
  feedbackEdit: editFeedbackType;
  updateFeedback: (id: string, updFeedback: Feedback) => void;
}
const Val = [
  { id: "1", text: "This item is from context DEFAULT", rating: 10 },
];
const FeedbackContext = createContext<ContextType>({
  feedback: Val,
  deleteFeedback: () => console.log("Uh oh"),
  addFeedback: () => console.log("Uh oh"),
  editFeedback: () => console.log(),
  feedbackEdit: { item: { id: "", rating: 1, text: "" }, edit: false },
  updateFeedback: () => console.log(),
});

export const FeedbackProvider = ({ children }: FeedbackContextType) => {
  const [feedback, setFeedback] = useState<Feedback[]>([
    { id: "1", text: "This item is from context", rating: 10 },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState<editFeedbackType>({
    item: { id: "", rating: 1, text: "" },
    edit: false,
  });

  const deleteFeedback = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  const addFeedback = (newFeedback: Feedback) => {
    //console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
  };
  const editFeedback = (item: Feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const updateFeedback = (id: string, updFeedback: Feedback) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updFeedback } : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
