import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import TableRow from "./TableRow";
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
      {showSearchResults &&
        isSearchLoaded &&
        Array.isArray(searchResults) &&
        searchResults.length > 0 &&
        searchResults?.map((row, index) => <TableRow key={index} row={row} />)}
    </tbody>
  );
};

export default TableBody;
