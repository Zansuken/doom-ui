import { FC, memo, useContext, useCallback } from "react";
import Input from "../Input/Input";
import { TableContext, TableContextType } from "./TableContext";
import CrossIcon from "../../assets/icons/cross.svg";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { TableRowType } from "./Table";

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

const Search: FC = memo(() => {
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
      setSearchParams({ search: e.target.value });
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
            className="cursor-pointer w-7 h-7 p-2 hover:opacity-70 rounded-full bg-transparent hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-colors focus:opacity-70"
            onClick={onClearSearch}
          >
            <img src={CrossIcon} alt="Clear search" className="w-full h-full" />
          </button>
        )
      }
    />
  );
});

export default Search;
