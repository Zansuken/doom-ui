import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TableColumnType, TableRowType } from "./Table";
import { useLocation, useSearchParams } from "react-router-dom";

type Pagination = {
  currentPage: number;
  totalEntries: number;
  showEntries: number;
  onShowEntries: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageNext: () => void;
  onPagePrev: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
};

export type TableContextType = {
  tableName?: string;
  columns: TableColumnType[];
  rows: TableRowType[];
  displayedRows?: TableRowType[];
  enablePagination?: boolean;
  pagination?: Pagination;
  enableSearch?: boolean;
  onClearSearch?: () => void;
  setSearchResults?: (rows: TableRowType[]) => void;
  setIsSearchLoaded?: (isLoaded: boolean) => void;
  isSearchLoaded?: boolean;
  searchResults?: TableRowType[];
  searchQuery?: string | null;
  isLoading?: boolean;
  children: React.ReactNode;
};

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
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);
  const [displayedRows, setDisplayedRows] = useState<TableRowType[]>([]);
  const [searchResults, setSearchResults] = useState<TableRowType[]>([]);
  const [isSearchLoaded, setIsSearchLoaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const maxPage = Math.ceil(rows.length / showEntries);
  const totalEntries = rows.length;

  const getCurrentPageRows = useCallback(() => {
    return [...rows].slice(
      (currentPage - 1) * showEntries,
      currentPage * showEntries
    );
  }, [currentPage, rows, showEntries]);

  const getIsPrevDisabled = useCallback(() => {
    return currentPage === 1;
  }, [currentPage]);

  const getIsNextDisabled = useCallback(() => {
    return currentPage === maxPage;
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

  const currentSearch = useMemo(() => {
    const searchQuery = searchParams.get("search");

    return searchQuery;
  }, [searchParams]);

  const onClearSearch = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");

    setSearchParams(searchParams);

    setSearchResults([]);
    setShowEntries(10);
  }, [location.search, setSearchParams]);

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
      onClearSearch();
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
        isLoading,
        children,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
