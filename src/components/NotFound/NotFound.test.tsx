import { render, screen } from "@testing-library/react";
import NotFound from ".";

describe("NotFound component", () => {
  beforeEach(() => {
    render(<NotFound data-testid="testId" />);
  });
  it("NotFound is rendered correctly", () => {
    expect(screen.getByTestId("testId")).toBeInTheDocument();
  });
});
