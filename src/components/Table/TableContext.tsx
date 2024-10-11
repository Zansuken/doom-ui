import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TableContextType, TableRowType } from "../../types";

const TableContext = createContext<TableContextType | undefined>(undefined);

const TableProvider: FC<TableContextType> = ({
  tableName,
  columns,
  rows,
  enablePagination,
  enableSearch,
  isLoading,
  children,
}) => {
  const location = window.location;
  const searchParams = new URLSearchParams(location.search);

  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);
  const [displayedRows, setDisplayedRows] = useState<TableRowType[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [searchResults, setSearchResults] = useState<TableRowType[]>([]);
  const [isSearchLoaded, setIsSearchLoaded] = useState(false);

  const maxPage = Math.ceil(rows.length / showEntries);
  const totalEntries = rows.length;

  const getCurrentPageRows = useCallback(() => {
    return [...rows].slice(
      (currentPage - 1) * showEntries,
      currentPage * showEntries
    );
  }, [currentPage, rows, showEntries]);

  const getIsPrevDisabled = useCallback(() => {
    return currentPage === 1 || totalEntries === 0;
  }, [currentPage]);

  const getIsNextDisabled = useCallback(() => {
    return currentPage === maxPage || totalEntries === 0;
  }, [currentPage, maxPage]);

  const onShowEntries = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setShowEntries(Number(e.target.value));
      setCurrentPage(1);
    },
    []
  );

  const onPageNext = useCallback(() => {
    if (currentPage === maxPage) return;

    setCurrentPage((prev) => prev + 1);
    setDisplayedRows(getCurrentPageRows());
  }, [currentPage, maxPage, getCurrentPageRows]);

  const onPagePrev = useCallback(() => {
    if (currentPage === 1) return;

    setCurrentPage((prev) => prev - 1);
    setDisplayedRows(getCurrentPageRows());
  }, [currentPage, getCurrentPageRows]);

  const onClearSearch = useCallback(() => {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");

    // Remove search query from URL

    window.history.pushState(
      {},
      "",
      `${location.pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`
    );

    setCurrentSearch("");
    setSearchResults([]);
    setShowEntries(10);
  }, [location.search]);

  const pagination = useMemo(
    () => ({
      currentPage,
      totalEntries,
      showEntries,
      onShowEntries,
      onPageNext,
      onPagePrev,
      isPrevDisabled: getIsPrevDisabled(),
      isNextDisabled: getIsNextDisabled(),
    }),
    [
      currentPage,
      totalEntries,
      showEntries,
      onShowEntries,
      onPageNext,
      onPagePrev,
      getIsPrevDisabled,
      getIsNextDisabled,
    ]
  );

  useEffect(() => {
    if (enablePagination) {
      setDisplayedRows(
        [...rows].slice(
          (currentPage - 1) * showEntries,
          currentPage * showEntries
        )
      );
    } else {
      setDisplayedRows(rows);
    }
  }, [currentPage, enablePagination, rows, showEntries]);

  useEffect(() => {
    if (!currentSearch) {
      searchParams.delete("search");

      // Remove search query from URL
      window.history.pushState(
        {},
        "",
        `${location.pathname}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`
      );
    } else {
      // update search query in URL
      searchParams.set("search", currentSearch);

      window.history.pushState(
        {},
        "",
        `${location.pathname}?${searchParams.toString()}`
      );
    }
  }, [currentSearch]);

  return (
    <TableContext.Provider
      value={{
        tableName,
        columns: useMemo(() => columns, [columns]),
        rows: useMemo(() => rows, [rows]),
        displayedRows: useMemo(() => displayedRows, [displayedRows]),
        enablePagination,
        ...(enablePagination && { pagination }),
        enableSearch,
        ...(enableSearch && {
          onClearSearch,
          searchResults,
          setSearchResults,
          setIsSearchLoaded,
          isSearchLoaded,
        }),
        searchQuery: currentSearch,
        setSearchQuery: setCurrentSearch,
        isLoading,
        children,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
