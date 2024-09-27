import { FC } from "react";

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
      className={`${buttonProps?.disabled ? "btn-disabled" : "btn-default"}`}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
