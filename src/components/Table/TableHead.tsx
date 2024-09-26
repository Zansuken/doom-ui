import { FC, useContext } from "react";
import { TableContext, TableContextType } from "./TableContext";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

const TableHead: FC = () => {
  const { columns } = useContext(TableContext) as TableContextType;

  return (
    <thead>
      <TableRow isHeader>
        {columns.map((column) => (
          <TableCell key={column.key} isHeader>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  );
};

export default TableHead;
