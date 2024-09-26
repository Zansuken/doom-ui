import { FC } from "react";
import classNames from "classnames";

type Option = {
  value: string | number;
  label: string;
};

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
  id: string;
  /**
   * Additional props to be spread on the select input.
   */
  inputProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  label?: string;
  options: Option[];
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
  <div>
    <div
      className={classNames("flex justify-between", {
        "pb-1.5": Boolean(label),
      })}
    >
      <label
        htmlFor={id}
        className={classNames("block text-sm font-medium", {
          "text-red-500": Boolean(error),
        })}
      >
        {label}
      </label>
      <span className="text-red-500 text-sm">{error}</span>
    </div>
    <select
      id={id}
      className={classNames(
        "w-full hover:cursor-pointer px-3 py-2 rounded-md appearance-none pr-8 pl-4 bg-no-repeat bg-[url('./assets/icons/arrows-up-down.svg')] bg-[length:32px_32px] bg-[right_0_center]",
        {
          "border-red-500 focus-within:border-red-500 focus-within:outline-red-500 hover:outline-red-500 outline-transparent":
            Boolean(error),
        }
      )}
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
  </div>
);

export default Select;
