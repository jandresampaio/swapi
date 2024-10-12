import React from "react";
import { DatagridWrapper } from "./Datagrid.style";
import { DatagridProps } from "./Datagrid.types";

export const Datagrid: React.FC<DatagridProps> = ({
  "data-testid": testId,
}) => {
  
  return (
    <DatagridWrapper data-testid={testId}>
      Datagrid component
    </DatagridWrapper>
  );
};
