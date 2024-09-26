import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <div className="text">Loading...</div>
    </div>
  );
};

export default Loader;
