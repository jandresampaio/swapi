import React from "react";
import { LoadingIndicatorProps } from "./LoadingIndicator.types";
import { Atom } from "react-loading-indicators";
import "./LoadingIndicator.css";

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  "data-testid": testId,
}) => {
  return (
    <div
      data-testid={`${testId}_LoadingIndicator`}
      className="loading-indicator"
    >
      <Atom color="yellow" size="medium" text="Loading..." />
    </div>
  );
};
