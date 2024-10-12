import React, { useCallback, useEffect, useRef, useState } from "react";
import { CharactersTableProps } from "./CharactersTable.types";
import { GetCharactersResponse, swApiService } from "../../services/swapi";
import { CharactersTableColumns } from "./CharactersTable.helper";
import "./CharactersTable.css";

export const CharactersTable: React.FC<CharactersTableProps> = ({
  "data-testid": testId,
}) => {
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
  const initialPageData = {
    pageNumber: 1,
    pageUrl: "",
  };
  const [currentPage, setCurrentPage] = useState<{
    pageNumber: number;
    pageUrl: string;
  }>(initialPageData);

  const fetchCharacters = useCallback(
    async ({ search, pageUrl }: { search?: string; pageUrl?: string }) => {
      try {
        setLoading(true);
        const response = await swApiService.getCharacters({ search, pageUrl });
        console.log("response", response);
        setCharacters(response.data);
      } catch (err) {
        console.error("Error fetching characters: ", err);
        setError("Failed to fetch characters");
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

  const isTableLoaded = !loading && !error;

  console.log("loading: ", loading);
  return (
    <div data-testid={testId}>
      <h1 className="title">Star Wars Characters</h1>

      <div className="toolbar">
        <p>{characters.count} Characters</p>
        <input
          type="text"
          placeholder="Search..."
          disabled={loading}
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {isTableLoaded && (
        <table>
          <thead>
            <tr>
              {CharactersTableColumns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {characters.results.map((character, index) => (
              <tr key={index}>
                {CharactersTableColumns.map((column, index) => (
                  <td key={index}>{character[column.fieldName]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={!characters.previous || loading}
        >
          Previous
        </button>
        <span> Page {currentPage.pageNumber} </span>
        <button onClick={handleNextPage} disabled={!characters.next || loading}>
          Next
        </button>
      </div>
    </div>
  );
};
