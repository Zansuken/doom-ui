import { FC, useContext } from "react";
import { TableContext, TableContextType } from "./TableContext";
import TableRow from "./TableRow";

const TableBody: FC = () => {
  const {
    displayedRows = [],
    searchQuery,
    searchResults,
    isSearchLoaded,
  } = useContext(TableContext) as TableContextType;

  return (
    <tbody>
      {!searchQuery &&
        displayedRows.map((row, index) => <TableRow key={index} row={row} />)}
      {searchQuery && !isSearchLoaded && (
        <tr>
          <td colSpan={100} className="text-center py-4">
            Loading...
          </td>
        </tr>
      )}
      {searchQuery &&
        isSearchLoaded &&
        Array.isArray(searchResults) &&
        searchResults.length > 0 &&
        searchResults?.map((row, index) => <TableRow key={index} row={row} />)}
      {searchQuery && isSearchLoaded && searchResults?.length === 0 && (
        <tr>
          <td colSpan={100} className="text-center py-4">
            No results found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
