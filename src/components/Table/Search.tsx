import { FC, memo, useContext, useCallback } from "react";
import Input from "../Input/Input";
import { TableContext, TableContextType } from "./TableContext";
import CrossIcon from "../../../assets/icons/cross.svg";
import { useSearchParams } from "react-router-dom";
import { TableRowType } from "./Table";
import classes from "./Search.module.css";

type Props = {
  searchParamEnabled?: boolean;
};

// Create an equivalent of debounce from lodash
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

const debounceSearch = debounce(
  ({
    query,
    rows,
    setSearchResults,
    setIsSearchLoaded,
  }: {
    query: string;
    rows: TableRowType[];
    setSearchResults: ((rows: TableRowType[]) => void) | undefined;
    setIsSearchLoaded: ((isLoaded: boolean) => void) | undefined;
  }) => {
    const filteredRows = rows.filter((row) => {
      return Object.values(row).some(({ value }) => {
        const valueToLowerCase = value.toLowerCase();
        const newSearchQueryToLowerCase = query.toLowerCase();

        return valueToLowerCase.includes(newSearchQueryToLowerCase);
      });
    });

    if (setSearchResults) setSearchResults(filteredRows);

    if (setIsSearchLoaded) setIsSearchLoaded(true);
  },
  300
);

const Search: FC<Props> = memo(({ searchParamEnabled }) => {
  const {
    onClearSearch,
    searchQuery,
    setSearchResults,
    rows,
    setIsSearchLoaded,
  } = useContext(TableContext) as TableContextType;

  const [, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setIsSearchLoaded) setIsSearchLoaded(false);
      if (searchParamEnabled) setSearchParams({ search: e.target.value });
      if (e.target.value.length < 3) return;
      debounceSearch({
        query: e.target.value,
        rows,
        setSearchResults,
        setIsSearchLoaded,
      });
    },
    [setIsSearchLoaded, setSearchParams, rows, setSearchResults]
  );

  return (
    <Input
      id="search"
      type="text"
      inputProps={{
        onChange: handleSearch,
        placeholder: "Search...",
        value: searchQuery || "",
      }}
      endAdornment={
        searchQuery && (
          <button
            className={classes["clear-search-btn"]}
            onClick={onClearSearch}
          >
            <img
              src={CrossIcon}
              alt="Clear search"
              className={classes["clear-search-icon"]}
            />
          </button>
        )
      }
    />
  );
});

export default Search;
