import "./index.css";
import Button from "./components/Button/Button";
import DatePicker from "./components/DatePicker/DatePicker";
import Dialog from "./components/Dialog/Dialog";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Table from "./components/Table/Table";
import { FC } from "react";
import ReactDOM from "react-dom/client";

export { Button, DatePicker, Dialog, Input, Select, Table };

const App: FC = () => {
  return <Select id="aze" options={[{ label: "test", value: "test" }]} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
