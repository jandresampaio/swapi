import { NotFoundWrapper } from "./NotFound.style";
import { NotFoundProps } from "./NotFound.types";

export const NotFound: React.FC<NotFoundProps> = ({
  "data-testid": testId,
}) => {
  return (
    <NotFoundWrapper data-testid={testId}>
      NotFound component
    </NotFoundWrapper>
  );
};
