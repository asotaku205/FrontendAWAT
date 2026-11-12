import { listPendingAddresses, parseAddresses } from "../../../services/generated/awat";
export const getPendingAddresses = (signal?: AbortSignal) =>
  listPendingAddresses({ signal });
export const parseSelectedAddresses = (orderCodes: string[]) =>
  parseAddresses({ orderCodes });