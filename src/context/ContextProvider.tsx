import { ReactNode, StrictMode } from "react";
import { GitProvider } from "./GitContext";
import { PopularReposContextProvider } from "./PopularReposContext";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StrictMode>
      <PopularReposContextProvider>
        <GitProvider>{children}</GitProvider>
      </PopularReposContextProvider>
    </StrictMode>
  );
};
