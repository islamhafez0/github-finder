import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext";

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw Error("username context must be used within provider");
  }
  return context;
};
