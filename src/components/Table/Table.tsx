import { FC, memo } from "react";
import { TableProvider } from "./TableContext";
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "./Loader";
import Search from "./Search";
import classes from "./Table.module.css";
import { TableColumnType, TableRowType } from "../../types";
import TableStateMessage from "./TableStateMessage";

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

const TableContent: FC<Props> = memo(
  ({ enablePagination, enableSearch, isLoading, title }) => {
    return (
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
            <>
              <table className={classes["table"]}>
                <TableHead />
                <TableBody />
              </table>
              <TableStateMessage />
            </>
          )}
        </div>
        {enablePagination && <TablePagination />}
      </div>
    );
  }
);

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
      <TableContent
        columns={columns}
        rows={rows}
        enablePagination={enablePagination}
        enableSearch={enableSearch}
        isLoading={isLoading}
        title={title}
      />
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
