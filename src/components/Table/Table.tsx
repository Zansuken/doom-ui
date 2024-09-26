import { FC } from "react";
import { TableProvider } from "./TableContext";
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "./Loader";
import Search from "./Search";

export type TableColumnType = {
  label: string;
  key: string;
};

export type TableRowValue = {
  value: string;
  hide?: boolean;
};

export type TableRowType = {
  [key: string]: TableRowValue;
};

type Props = {
  columns: TableColumnType[];
  rows: TableRowType[];
  enablePagination?: boolean;
  enableSearch?: boolean;
  isLoading?: boolean;
  title?: string;
};

const Table: FC<Props> = ({
  columns,
  rows,
  enablePagination,
  enableSearch,
  isLoading,
  title,
}) => {
  return (
    <TableProvider
      columns={columns}
      rows={rows}
      enablePagination={enablePagination}
      enableSearch={enableSearch}
      isLoading={isLoading}
    >
      {(enableSearch || title) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h1 className="text-3xl font-bold">{title}</h1>}
          {enableSearch && <Search />}
        </div>
      )}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <table className="flex-1 w-full max-h-[calc(100%-42px-1rem)]">
            <TableHead />
            <TableBody />
          </table>
        )}
      </div>
      {enablePagination && <TablePagination />}
    </TableProvider>
  );
};

export default Table;
