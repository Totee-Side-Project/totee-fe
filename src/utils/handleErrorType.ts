export const handleErrorType = (err: unknown) => {
  let errorMessage = '요청이 제대로 이루어지지 않았습니다.';
  if (err instanceof Error) errorMessage = err.message;
  return errorMessage;
};
