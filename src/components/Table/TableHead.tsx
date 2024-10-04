import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import { TableContextType } from "../../types";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

const TableHead: FC = () => {
  const { columns } = useContext(TableContext) as TableContextType;

  return (
    <thead>
      <TableRow isHeader>
        {columns.map((column) => (
          <TableCell key={column.key} isHeader value={column.label} />
        ))}
      </TableRow>
    </thead>
  );
};

export default TableHead;
