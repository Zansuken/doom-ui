import classNames from "classnames";
import { FC, useContext } from "react";
import { TableContext, TableContextType } from "./TableContext";

type Props = {
  isHeader?: boolean;
  children: React.ReactNode;
};

const TableCell: FC<Props> = ({ isHeader = false, children }) => {
  const { searchQuery } = useContext(TableContext) as TableContextType;

  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <p
          key={index}
          className="text-ellipsis overflow-visible relative w-fit h-fit font-semibold z-10 whitespace-nowrap"
        >
          <span className="after:-z-10 after:bg-yellow-300 after:-ml-1.5 after:-mr-1.5 after:mt-0.5 after:rounded-md after:absolute after:inset-0 after:opacity-50 after:content-[''] after:transform after:transition-all after:duration-300 after:ease-in-out">
            {part}
          </span>
        </p>
      ) : (
        <p key={index} className="w-fit whitespace-nowrap">
          {part}
        </p>
      )
    );
  };

  return (
    <td
      className={classNames("box-border h-fit", {
        "px-4 py-2 bg-muted text-muted-foreground text-sm": isHeader,
        "p-4": !isHeader,
      })}
    >
      <div className="w-fit flex flex-row">
        {highlightText(children as string)}
      </div>
    </td>
  );
};

export default TableCell;
