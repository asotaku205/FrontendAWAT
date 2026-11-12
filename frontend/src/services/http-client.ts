import axios, {
  type AxiosError,
  type AxiosRequestConfig,
} from "axios";

const baseURL = (
  import.meta.env.VITE_API_BASE_URL || "/api"
).replace(/\/+$/, "");

export const AXIOS_INSTANCE = axios.create({ baseURL });

export async function customInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  const requestConfig = {
    ...config,
    ...options,
  };

  const response = await AXIOS_INSTANCE(requestConfig);
  return response.data;
}
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;