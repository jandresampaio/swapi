import { render, screen } from "@testing-library/react";
import Datagrid from ".";

describe("Datagrid component", () => {
  beforeEach(() => {
    render(<Datagrid data-testid="testId" />);
  });
  it("Datagrid is rendered correctly", () => {
    expect(screen.getByTestId("testId")).toBeInTheDocument();
  });
});
