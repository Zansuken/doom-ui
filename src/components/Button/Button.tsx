import { FC } from "react";
import classes from "./Button.module.css";

type Props = {
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: string;
  onClick?: () => void;
  type: "button" | "submit";
};

const Button: FC<Props> = ({ buttonProps, type, onClick, children }) => {
  return (
    <button
      type={type}
      className={
        buttonProps?.disabled ? classes["btn-disabled"] : classes["btn-default"]
      }
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
