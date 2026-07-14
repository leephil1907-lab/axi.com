export class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
  MARKET_CLOSED: "MARKET_CLOSED",
} as const;

export const Errors = {
  unauthorized: (message = "Unauthorized") => new AppError(ErrorCodes.UNAUTHORIZED, message),
  forbidden: (message = "Forbidden") => new AppError(ErrorCodes.FORBIDDEN, message),
  notFound: (message = "Not found") => new AppError(ErrorCodes.NOT_FOUND, message),
  validation: (message = "Validation error") => new AppError(ErrorCodes.VALIDATION_ERROR, message),
  insufficientFunds: (message = "Insufficient funds") => new AppError(ErrorCodes.INSUFFICIENT_FUNDS, message),
  marketClosed: (message = "Market closed") => new AppError(ErrorCodes.MARKET_CLOSED, message),
};
