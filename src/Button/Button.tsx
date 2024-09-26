import { FC } from "react";
import classNames from "classnames";

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
      className={classNames(
        "px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md",
        {
          "hover:bg-gray-700": !buttonProps?.disabled,
          "cursor-not-allowed": buttonProps?.disabled,
          "bg-gray-400": buttonProps?.disabled,
        }
      )}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
