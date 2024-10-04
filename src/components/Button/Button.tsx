import { ButtonHTMLAttributes, FC } from "react";
import classes from "./Button.module.css";

type Props = {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  children: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const Button: FC<Props> = ({
  buttonProps,
  type = "button",
  onClick,
  children,
}) => {
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
