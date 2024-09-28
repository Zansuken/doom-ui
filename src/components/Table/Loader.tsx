import { FC, useLayoutEffect, useState } from "react";

const Loader: FC = () => {
  const [trailingDots, setTrailingDots] = useState("");

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTrailingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span>Loading</span>
      <span>{trailingDots}</span>
    </div>
  );
};

export default Loader;
