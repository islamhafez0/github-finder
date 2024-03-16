import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw Error("usePagination must be used within provider");
  }
  return context;
};
