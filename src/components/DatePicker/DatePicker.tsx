import { FC, InputHTMLAttributes } from "react";
import Input from "../Input/Input";

type Props = {
  error?: string;
  id: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  endAdornment?: React.ReactNode;
};

const DatePicker: FC<Props> = (props) => {
  return <Input type="date" {...props} />;
};

export default DatePicker;
