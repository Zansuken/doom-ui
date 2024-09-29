import { FC } from "react";
import { TableProvider } from "./TableContext";
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "./Loader";
import Search from "./Search";
import { BrowserRouter as Router } from "react-router-dom";
import classes from "./Table.module.css";

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
  useRouter?: boolean;
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
      <div className={classes["root"]}>
        {(enableSearch || title) && (
          <div className={classes["title-container"]}>
            {title && <h1 className={classes["title"]}>{title}</h1>}
            {enableSearch && <Search searchParamEnabled />}
          </div>
        )}
        <div className={classes["table-container"]}>
          {isLoading ? (
            <div className={classes["loader-container"]}>
              <Loader />
            </div>
          ) : (
            <table className={classes["table"]}>
              <TableHead />
              <TableBody />
            </table>
          )}
        </div>
        {enablePagination && <TablePagination />}
      </div>
    </TableProvider>
  );
};

const TableExport: FC<Props> = (props) => (
  <>
    {props.useRouter ? (
      <Router>
        <Table {...props} />
      </Router>
    ) : (
      <Table {...props} />
    )}
  </>
);

export default TableExport;
