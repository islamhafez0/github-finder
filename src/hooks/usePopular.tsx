import { useContext } from "react";
import { PopularReposContext } from "../context/PopularReposContext";

export const usePopular = () => {
  const context = useContext(PopularReposContext);
  if (!context) {
    throw Error("Context must be used within provider!");
  }
  return context;
};
