/**
 * Represents an option for a select input.
 *
 * @typedef {Object} SelectOptionType
 * @property {string | number} value - The value of the option, which can be a string or a number.
 * @property {string} label - The label of the option, which is displayed to the user.
 */
export type SelectOptionType = {
  value: string | number;
  label: string;
};

/**
 * Represents a column in a table.
 *
 * @typedef {Object} TableColumnType
 * @property {string} label - The label to be displayed in the table header.
 * @property {string} key - The key to be used to access the value in the row object.
 */
export type TableColumnType = {
  label: string;
  key: string;
};

/**
 * Represents a value in a table row.
 *
 * @typedef {Object} TableRowValue
 * @property {string} value - The value to be displayed in the table row.
 * @property {boolean} [hide] - Optional flag to indicate whether the value should be hidden.
 */
export type TableRowValue = {
  value: string;
  hide?: boolean;
};

export type TableRowType = {
  [key: string]: TableRowValue;
};

export type PaginationType = {
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
  pagination?: PaginationType;
  enableSearch?: boolean;
  onClearSearch?: () => void;
  setSearchResults?: (rows: TableRowType[]) => void;
  setIsSearchLoaded?: (isLoaded: boolean) => void;
  isSearchLoaded?: boolean;
  searchResults?: TableRowType[];
  searchQuery?: string | null;
  setSearchQuery?: (query: string) => void;
  isLoading?: boolean;
  children: React.ReactNode;
};
