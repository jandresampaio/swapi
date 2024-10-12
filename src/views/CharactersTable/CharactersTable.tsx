import React, { useCallback, useEffect, useRef, useState } from "react";
import { GetCharactersResponse, swApiService } from "../../services/swapi";
import { CharactersTableColumns } from "./CharactersTable.helper";
import "./CharactersTable.css";
import LoadingIndicator from "../../components/LoadingIndicator";
import Logo from "../../components/Logo";
import NotFound from "../../components/NotFound";
import ErrorIndicator from "../../components/ErrorIndicator";

export const CharactersTable: React.FC = () => {
  const [characters, setCharacters] = useState<GetCharactersResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const searchTimeOut = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const initialPageData = {
    pageNumber: 1,
    pageUrl: "",
  };
  const [currentPage, setCurrentPage] = useState<{
    pageNumber: number;
    pageUrl: string;
  }>(initialPageData);
  const pageSize = 10;
  const startItem = (currentPage.pageNumber - 1) * pageSize + 1;
  const endItem = startItem + characters.results.length - 1;

  const fetchCharacters = useCallback(
    async ({ search, pageUrl }: { search?: string; pageUrl?: string }) => {
      try {
        setLoading(true);
        const response = await swApiService.getCharacters({ search, pageUrl });
        setCharacters(response.data);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 200);
        setError(null);
      } catch (err) {
        console.error("Error fetching characters: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCharacters({
      search: searchText,
      pageUrl: currentPage.pageUrl,
    });
  }, [currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);

    if (searchTimeOut.current) {
      clearTimeout(searchTimeOut.current);
    }

    searchTimeOut.current = setTimeout(() => {
      setCurrentPage(initialPageData);
    }, 600);
  };

  const handlePrevPage = () => {
    if (characters.previous)
      setCurrentPage((prev) => ({
        pageNumber: prev.pageNumber - 1,
        pageUrl: characters.previous,
      }));
  };

  const handleNextPage = () => {
    if (characters.next)
      setCurrentPage((prev) => ({
        pageNumber: prev.pageNumber + 1,
        pageUrl: characters.next,
      }));
  };

  return (
    <div data-testid="CharactersTable" className="table-container">
      <div className="toolbar">
        <h3 data-testid="CharactersTable Title" className="title">
          <Logo />
          {characters.count} Characters
        </h3>
        <input
          data-testid="CharactersTable_input Search"
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          disabled={loading}
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="table-content">
        {loading && (
          <LoadingIndicator data-testid="CharactersTable_LoadingIndicator" />
        )}

        {
          <table
            className="table-datagrid"
            style={{
              opacity: loading ? 0.5 : 1,
            }}
          >
            <thead className="table-header">
              <tr>
                {CharactersTableColumns.map((column, index) => (
                  <th
                    key={index}
                    style={{
                      width: 100 / CharactersTableColumns.length + "%",
                    }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {characters.results.length === 0 && !loading && <NotFound />}
              {error && !loading && (
                <ErrorIndicator
                  data-testid="CharactersTable_ErrorIndicator"
                  errorMessage={error}
                  retry={() =>
                    fetchCharacters({
                      search: searchText,
                      pageUrl: currentPage.pageUrl,
                    })
                  }
                />
              )}
              {!error &&
                characters.results.map((character, index) => (
                  <tr
                    data-testid={`CharactersTable_Row_${character.name}`}
                    key={index}
                  >
                    {CharactersTableColumns.map((column, index) => (
                      <td key={index}>{character[column.fieldName]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        }
      </div>

      <div
        data-testid="CharactersTable PaginationSection"
        className="pagination"
      >
        <button
          data-testid="CharactersTable_button Previous"
          onClick={handlePrevPage}
          disabled={!characters.previous || loading || !!error}
        >
          Previous
        </button>
        <span> Page {currentPage.pageNumber} </span>
        <span>{`(${startItem}-${endItem})`}</span>
        <button
          data-testid="CharactersTable_button Next"
          onClick={handleNextPage}
          disabled={!characters.next || loading || !!error}
        >
          Next
        </button>
      </div>
    </div>
  );
};
