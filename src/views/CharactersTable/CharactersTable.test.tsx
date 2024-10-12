import { render, screen } from "@testing-library/react";
import axios from "axios";
import { CharactersTable } from "./CharactersTable";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CharacterTable Component", () => {
  test("renders the Star Wars logo", () => {
    render(<CharactersTable />);
    const logoElement = screen.getByTestId("CharactersTable");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders a list of characters after fetching data", async () => {
    const charactersData = [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
      },
    ];

    // Mock the response from axios
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: charactersData },
    });

    render(<CharactersTable />);

    const characterName = await screen.findByText(/luke skywalker/i);
    expect(characterName).toBeInTheDocument();
  });
});
