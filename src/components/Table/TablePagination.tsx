import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import { TableContextType } from "../../types";
import Select from "../Select/Select";
import Button from "../Button/Button";
import classes from "./TablePagination.module.css";

const PageNumber: FC<{ number: number }> = ({ number }) => (
  <span>{`Page: ${number}`}</span>
);
const PageEntries: FC<{ from: number; to: number }> = ({ from, to }) => (
  <div>
    <span>
      Entries: {from} &rarr; {to}
    </span>
  </div>
);
const SearchResultsLabel: FC<{ amount: number }> = ({ amount }) => (
  <span>{`Showing ${amount} results`}</span>
);

const TablePagination: FC = () => {
  const { pagination, searchQuery, searchResults } = useContext(
    TableContext
  ) as TableContextType;

  const showSearchResults = searchQuery && searchQuery?.length > 2;

  if (!pagination) {
    return null;
  }

  return (
    <div className={classes["root"]}>
      {!showSearchResults && (
        <div className={classes["entries-container"]}>
          <label htmlFor="showEntries" className={classes["entries-label"]}>
            Show entries
          </label>
          <Select
            id="showEntries"
            onChange={pagination?.onShowEntries}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
          />
        </div>
      )}
      <div className={classes["search-entries-container"]}>
        {showSearchResults ? (
          <SearchResultsLabel amount={searchResults?.length ?? 0} />
        ) : (
          <>
            <PageNumber number={pagination?.currentPage} />
            <span>|</span>
            <PageEntries
              from={pagination?.currentPage * pagination?.showEntries}
              to={pagination?.totalEntries}
            />
          </>
        )}
      </div>
      {!showSearchResults && (
        <div className={classes["actions-container"]}>
          {pagination?.currentPage !== 1 && (
            <Button
              type="button"
              onClick={pagination?.onPagePrev}
              buttonProps={{ disabled: pagination?.isPrevDisabled }}
            >
              Prev
            </Button>
          )}
          <Button
            type="button"
            onClick={pagination?.onPageNext}
            buttonProps={{ disabled: pagination?.isNextDisabled }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default TablePagination;
