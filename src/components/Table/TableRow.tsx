import { FC, Fragment, memo } from "react";
import { TableRowType } from "./Table";
import TableCell from "./TableCell";
import classes from "./TableRow.module.css";

type Props = {
  row?: TableRowType;
  isHeader?: boolean;
  children?: React.ReactNode;
};

const TableRow: FC<Props> = memo(({ row = [], isHeader, children }) => {
  if (isHeader) {
    return <tr className={classes["header-row"]}>{children}</tr>;
  }

  return (
    <tr className={classes["row"]}>
      {Object.values(row).map(({ value, hide }, index) => (
        <Fragment key={index}>
          {!hide && <TableCell>{value}</TableCell>}
        </Fragment>
      ))}
    </tr>
  );
});

export default TableRow;
