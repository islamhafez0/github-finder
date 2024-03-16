import { useContext } from "react";
import { GithubContext } from "../context/GitContext";

export const useGit = () => {
  const context = useContext(GithubContext);
  if (!context) {
    throw Error("git context must be used within context");
  }
  return context;
};
