import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

type Props = {
  error?: string;
  id: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  endAdornment?: React.ReactNode;
};

const Input: FC<Props> = ({
  error,
  id,
  inputProps,
  label,
  type,
  endAdornment,
}) => (
  <div className="relative">
    <div className="flex justify-between">
      {label && (
        <label
          htmlFor={id}
          className={classNames("block text-sm font-medium mb-1", {
            "text-red-500": Boolean(error),
          })}
        >
          {label}
        </label>
      )}
      <span className="text-red-500 text-sm">{error}</span>
    </div>
    <input
      type={type}
      id={id}
      className={classNames(
        "w-full px-3 py-2 border rounded-md hover:ring-1 hover:ring-black focus:outline-none focus:ring-2 focus:ring-black transition-colors",
        {
          "border-red-500 hover:ring-red-500 focus:ring-red-500":
            Boolean(error),
        }
      )}
      {...inputProps}
    />
    {endAdornment && (
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {endAdornment}
      </div>
    )}
  </div>
);

export default Input;
