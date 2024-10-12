import { render, screen } from "@testing-library/react";
import LoadingIndicator from ".";

describe("LoadingIndicator component", () => {
  beforeEach(() => {
    render(<LoadingIndicator data-testid="testId" />);
  });
  it("LoadingIndicator is rendered correctly", () => {
    expect(screen.getByTestId("testId_LoadingIndicator")).toBeInTheDocument();
  });
});
