import { FC } from "react";
import classNames from "classnames";
import classes from "./Select.module.css";
import ArrowsIcon from "../../../assets/icons/arrows-up-down.svg";
import { SelectOptionType } from "../../types";

type Props = {
  /**
   * Determines whether an empty option should be displayed.
   */
  emptyOption?: string;
  /**
   * The error message to be displayed
   * when the select input is invalid.
   */
  error?: string;
  id?: string;
  /**
   * Additional props to be spread on the select input.
   */
  inputProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  label?: string;
  options: SelectOptionType[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

/**
 * A reusable select input component.
 *
 * @example
 * <caption>Controlled</caption>
 * <Select
 *    id="state"
 *    label="State"
 *    options={[
 *      { value: "CA", label: "California" },
 *      { value: "NY", label: "New York" },
 *      { value: "TX", label: "Texas" },
 *    ]}
 *    onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * <caption>Uncontrolled</caption>
 * <Select
 *    id="country"
 *    label="Country"
 *    emptyOption
 *    error="Country is required"
 *    inputProps={...} // Could be used to set react-hook-form's register for example
 *    options={[
 *      { value: "US", label: "United States" },
 *      { value: "CA", label: "Canada" },
 *      { value: "MX", label: "Mexico" },
 *    ]}
 * />
 */
const Select: FC<Props> = ({
  emptyOption,
  error,
  id,
  inputProps,
  label,
  options,
  onChange,
}) => (
  <div className={classes["root"]}>
    <div
      className={classNames(classes["label-container"], {
        [classes["label-active"]]: Boolean(label),
      })}
    >
      <label
        htmlFor={id}
        className={classNames(classes["label"], {
          [classes["label-error"]]: Boolean(error),
        })}
      >
        {label}
        {inputProps?.required && "*"}
      </label>
      <span className={classNames(classes["label"], classes["label-error"])}>
        {error}
      </span>
    </div>
    <select
      id={id}
      className={classNames(classes["select"], {
        [classes["select-error"]]: Boolean(error),
      })}
      onChange={onChange}
      {...inputProps}
    >
      {emptyOption && (
        <option key="empty" value="">
          {emptyOption}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <img
      className={classes["arrows-icon"]}
      src={ArrowsIcon}
      alt="Arrows Icon"
    />
  </div>
);

export default Select;
