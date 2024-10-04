import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import TableRow from "./TableRow";
import Loader from "./Loader";
import classes from "./TableBody.module.css";
import { TableContextType } from "../../types";

const TableBody: FC = () => {
  const {
    displayedRows = [],
    searchQuery,
    searchResults,
    isSearchLoaded,
  } = useContext(TableContext) as TableContextType;

  const showSearchResults = searchQuery && searchQuery?.length > 2;

  return (
    <tbody>
      {!showSearchResults &&
        displayedRows.map((row, index) => <TableRow key={index} row={row} />)}
      {showSearchResults && !isSearchLoaded && (
        <tr>
          <td colSpan={100}>
            <Loader />
          </td>
        </tr>
      )}
      {showSearchResults &&
        isSearchLoaded &&
        Array.isArray(searchResults) &&
        searchResults.length > 0 &&
        searchResults?.map((row, index) => <TableRow key={index} row={row} />)}
      {showSearchResults && isSearchLoaded && searchResults?.length === 0 && (
        <tr>
          <td colSpan={100} className={classes["no-results"]}>
            No results found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
