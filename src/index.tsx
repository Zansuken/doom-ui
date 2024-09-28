import "./index.css";
import ReactDOM from "react-dom/client";
import Button from "./components/Button/Button";
import DatePicker from "./components/DatePicker/DatePicker";
import Dialog from "./components/Dialog/Dialog";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Table from "./components/Table/Table";
import CrossIcon from "../assets/icons/cross.svg";

export { Button, DatePicker, Dialog, Input, Select, Table };

// const App = () => {
//   return (
//     <Input
//       id="test"
//       error="false"
//       label="test"
//       type="text"
//       endAdornment={<img src={CrossIcon} />}
//     />
//   );
// };

// // inject the components into the DOM
// ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
