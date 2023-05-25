import React from "react";
import { useState, createContext, useEffect } from "react";
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
  isLoading: boolean;
}
const FeedbackContext = createContext<ContextType>({
  feedback: [
    { id: "1", text: "This item is from context DEFAULT", rating: 10 },
  ],
  deleteFeedback: () => console.log("Uh oh"),
  addFeedback: () => console.log("Uh oh"),
  editFeedback: () => console.log(),
  feedbackEdit: { item: { id: "", rating: 1, text: "" }, edit: false },
  updateFeedback: () => console.log(),
  isLoading: true,
});

export const FeedbackProvider = ({ children }: FeedbackContextType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [feedbackEdit, setFeedbackEdit] = useState<editFeedbackType>({
    item: { id: "", rating: 1, text: "" },
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(SERVER + "/feedback");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(SERVER + `/feedback/${id}`, { method: "DELETE" });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  const addFeedback = async (newFeedback: Feedback) => {
    //console.log(newFeedback);
    const response = await fetch(SERVER + "/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };
  const editFeedback = (item: Feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const updateFeedback = async (id: string, updFeedback: Feedback) => {
    const response = await fetch(SERVER + `/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updFeedback),
    });
    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
