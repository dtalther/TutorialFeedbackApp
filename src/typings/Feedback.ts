export interface Feedback {
  id: string;
  text: string;
  rating: number;
}
export type DeleteFunction = (id: string) => void;
export type AddFunction = (newFeedback: Feedback) => void;
export type SelectFunction = (rating: number) => void;
export type EditFunction = (toEdit: Feedback) => void;
