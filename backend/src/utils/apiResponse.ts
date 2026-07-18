interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const apiResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
): ApiResponse<T> => ({
  success,
  message,
  data,
});

export default apiResponse;
