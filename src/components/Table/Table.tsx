import { FC } from "react";
import { TableProvider } from "./TableContext";
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "./Loader";
import Search from "./Search";
import classes from "./Table.module.css";
import { TableColumnType, TableRowType } from "../../types";

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
const TableExport: FC<Props> = (props) => <Table {...props} />;

export default TableExport;
