import { FC } from "react";
import { TableProvider } from "./TableContext";
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "./Loader";
import Search from "./Search";
import { BrowserRouter as Router } from "react-router-dom";
import classes from "./Table.module.css";

/**
 * Represents a column in a table.
 *
 * @typedef {Object} TableColumnType
 * @property {string} label - The label to be displayed in the table header.
 * @property {string} key - The key to be used to access the value in the row object.
 */
export type TableColumnType = {
  label: string;
  key: string;
};

/**
 * Represents a value in a table row.
 *
 * @typedef {Object} TableRowValue
 * @property {string} value - The value to be displayed in the table row.
 * @property {boolean} [hide] - Optional flag to indicate whether the value should be hidden.
 */
export type TableRowValue = {
  value: string;
  hide?: boolean;
};

export type TableRowType = {
  [key: string]: TableRowValue;
};

type Props = {
  /**
   * The columns to be displayed in the table.
   * @type {TableColumnType[]}
   * @required
   * @example
   * [
   *  { label: "Name", key: "name" },
   *  { label: "Age", key: "age" },
   * ]
   * */
  columns: TableColumnType[];
  /**
   * The rows to be displayed in the table.
   * @type {TableRowType[]}
   * @required
   * @example
   * [
   *  { name: { value: "John Doe" }, age: { value: "25" } },
   *  { name: { value: "Jane Doe" }, age: { value: "23" } },
   * ]
   * */
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

/**
 * A table component that displays data in a tabular format.
 *
 * @example
 * <Table
 *    columns={[
 *    { label: "Name", key: "name" },
 *    { label: "Age", key: "age" },
 *    ]}
 *    rows={[
 *    { name: { value: "John Doe" }, age: { value: "25" } },
 *    { name: { value: "Jane Doe" }, age: { value: "23" } },
 *    ]}
 *    enablePagination
 *    enableSearch
 *    isLoading={isLoading}
 * />
 */
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
