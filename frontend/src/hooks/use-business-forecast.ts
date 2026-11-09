import useApiData from "./use-api-data";
import { API_ENDPOINTS } from "../services/api";
import type { ForecastProduct } from "../services/types";

const useBusinessForecast = () =>
  useApiData<ForecastProduct[]>(API_ENDPOINTS.forecastProducts);

export default useBusinessForecast;
