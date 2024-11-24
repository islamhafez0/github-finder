import { ReactNode } from "react";
import { GitProvider } from "./GitContext";
import { PopularReposContextProvider } from "./PopularReposContext";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PopularReposContextProvider>
      <GitProvider>{children}</GitProvider>,
    </PopularReposContextProvider>
  );
};
