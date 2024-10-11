import { FC, useContext } from "react";
import classes from "./TableStateMessage.module.css";
import { TableContext } from "./TableContext";
import { TableContextType } from "../../types";
import Loader from "./Loader";

const TableStateMessage: FC = () => {
  const {
    displayedRows = [],
    searchQuery,
    searchResults,
    isSearchLoaded,
  } = useContext(TableContext) as TableContextType;

  const showSearchResults = searchQuery && searchQuery?.length > 2;

  const noDisplayedRows = Boolean(
    !showSearchResults && displayedRows.length === 0
  );
  const searchNotLoaded = Boolean(showSearchResults && !isSearchLoaded);
  const noSearchResults = Boolean(
    showSearchResults && isSearchLoaded && searchResults?.length === 0
  );

  // return null if all above conditions are false
  if (!noDisplayedRows && !searchNotLoaded && !noSearchResults) {
    return null;
  }

  return (
    <div className={classes["table-state-message"]}>
      {noDisplayedRows && <span>No data to display</span>}
      {searchNotLoaded && <Loader />}
      {noSearchResults && <span>No results found</span>}
    </div>
  );
};

export default TableStateMessage;
