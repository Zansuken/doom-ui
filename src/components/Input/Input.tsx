import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import classes from "./Input.module.css";

type Props = {
  error?: string;
  id?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  endAdornment?: React.ReactNode;
};

const Input: FC<Props> = ({
  error,
  id,
  inputProps,
  label,
  type = "text",
  endAdornment,
}) => (
  <div className={classes["root"]}>
    {(label || error) && (
      <div className={classes["label-container"]}>
        {label && (
          <label
            htmlFor={id}
            className={classNames(classes["label"], {
              [classes["label-error"]]: Boolean(error),
            })}
          >
            {label}
          </label>
        )}
        <span className={classNames(classes["label"], classes["label-error"])}>
          {error}
        </span>
      </div>
    )}
    <input
      type={type}
      id={id}
      className={classNames(classes["input"], {
        [classes["input-error"]]: Boolean(error),
      })}
      {...inputProps}
    />
    {endAdornment && (
      <div className={classes["endAdornment"]}>{endAdornment}</div>
    )}
  </div>
);

export default Input;
