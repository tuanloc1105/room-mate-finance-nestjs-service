export interface ErrorCode {
  message: string;
  code: number;
}

export const ErrorCodeEnum: { [key: string]: ErrorCode } = {
  SUCCESS: { message: 'Successful', code: 0 },
  FAILURE: { message: 'Failure.', code: 1 },
  AUTH_FAILURE: { message: 'Auth Failure.', code: 2 },
};
