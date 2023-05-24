import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  version: "primary" | "secondary";
  type: "button" | "submit" | "reset" | undefined;
  isDisabled: boolean;
};

const Button = ({ children, version, type, isDisabled }: ButtonProps) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

export default Button;
