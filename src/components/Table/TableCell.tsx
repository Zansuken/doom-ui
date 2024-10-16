import classNames from "classnames";
import { FC, ReactNode, useContext } from "react";
import { TableContextType } from "../../types";
import classes from "./TableCell.module.css";
import highlightWords from "highlight-words";
import { TableContext } from "./TableContext";

type Props = {
  isHeader?: boolean;
  value: string;
};

const CellType: FC<{
  isHeader: boolean;
  children: ReactNode;
  className: string;
}> = ({ isHeader, children, className }) => (
  <>
    {isHeader ? (
      <th className={className} scope="col">
        {children}
      </th>
    ) : (
      <td className={className} scope="row">
        {children}
      </td>
    )}
  </>
);

const TableCell: FC<Props> = ({ isHeader = false, value = "" }) => {
  const { searchQuery } = useContext(TableContext) as TableContextType;

  const chunks = highlightWords({
    text: value,
    query: (searchQuery as string) ?? "",
  });

  return (
    <CellType
      isHeader={isHeader}
      className={classNames(classes["root"], {
        [classes["root-head"]]: isHeader,
        [classes["root-no-head"]]: !isHeader,
      })}
    >
      <div className={classes["text-container"]}>
        {chunks.map(({ text, match, key }) =>
          match ? (
            <span
              className={classNames({ [classes["highlight"]]: !isHeader })}
              key={key}
            >
              {text}
            </span>
          ) : (
            <span key={key}>{text}</span>
          )
        )}
      </div>
    </CellType>
  );
};

export default TableCell;
