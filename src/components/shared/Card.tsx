import React from "react";

type CardProps = {
  children: React.ReactNode;
  reverse?: boolean;
};

function Card({ children, reverse = false }: CardProps) {
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
}

export default Card;
