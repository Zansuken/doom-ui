import { FC, Fragment, memo } from "react";
import { TableRowType } from "./Table";
import TableCell from "./TableCell";

type Props = {
  row?: TableRowType;
  isHeader?: boolean;
  children?: React.ReactNode;
};

const TableRow: FC<Props> = memo(({ row = [], isHeader, children }) => {
  if (isHeader) {
    return <tr className="bg-muted text-muted-foreground">{children}</tr>;
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {Object.values(row).map(({ value, hide }, index) => (
        <Fragment key={index}>
          {!hide && <TableCell>{value}</TableCell>}
        </Fragment>
      ))}
    </tr>
  );
});

export default TableRow;
