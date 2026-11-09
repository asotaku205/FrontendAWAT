import { useState } from "react";
import useApiData from "./use-api-data";
import { API_ENDPOINTS } from "../services/api";
import type {
  TelesaleEmployee,
  TelesaleEmployeeFilterOptions,
} from "../services/types";

const useTelesaleEmployees = () => {
  const [search, setSearch] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [receivingStatus, setReceivingStatus] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [workingStatus, setWorkingStatus] = useState("true");

  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (employeeName) params.set("employeeName", employeeName);
  if (receivingStatus) params.set("receivingStatus", receivingStatus);
  if (callStatus) params.set("callStatus", callStatus);
  if (workingStatus) params.set("workingStatus", workingStatus);

  const query = params.toString();
  const employeesEndpoint = query
    ? `${API_ENDPOINTS.telesaleEmployees}?${query}`
    : API_ENDPOINTS.telesaleEmployees;
  const {
    data: employees,
    error,
    isLoading,
  } = useApiData<TelesaleEmployee[]>(employeesEndpoint);
  const {
    data: filterOptions,
    error: filterOptionsError,
    isLoading: areFilterOptionsLoading,
  } = useApiData<TelesaleEmployeeFilterOptions>(
    API_ENDPOINTS.telesaleEmployeeOptions,
  );

  const resetFilters = () => {
    setSearch("");
    setEmployeeName("");
    setReceivingStatus("");
    setCallStatus("");
    setWorkingStatus("");
  };

  return {
    employees: employees ?? [],
    error,
    isLoading,
    filterOptions,
    filterOptionsError,
    areFilterOptionsLoading,
    search,
    setSearch,
    employeeName,
    setEmployeeName,
    receivingStatus,
    setReceivingStatus,
    callStatus,
    setCallStatus,
    workingStatus,
    setWorkingStatus,
    resetFilters,
  };
};

export default useTelesaleEmployees;
