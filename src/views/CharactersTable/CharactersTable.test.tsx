import { render, screen } from "@testing-library/react";
import CharactersTable from ".";

describe("CharactersTable component", () => {
  beforeEach(() => {
    render(<CharactersTable data-testid="testId" />);
  });
  it("CharactersTable is rendered correctly", () => {
    expect(screen.getByTestId("testId")).toBeInTheDocument();
  });
});
