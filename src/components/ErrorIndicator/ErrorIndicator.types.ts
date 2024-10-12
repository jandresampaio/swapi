export interface ErrorIndicatorProps {
  "data-testid": string;
  errorMessage: string;
  retry: () => void;
}
