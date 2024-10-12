import { render, screen } from "@testing-library/react";
import ErrorIndicator from ".";

describe("ErrorIndicator component", () => {
  beforeEach(() => {
    render(<ErrorIndicator data-testid="testId" />);
  });
  it("ErrorIndicator is rendered correctly", () => {
    expect(screen.getByTestId("testId_ErrorIndicator")).toBeInTheDocument();
  });
});
