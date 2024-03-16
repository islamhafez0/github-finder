import { ReactNode } from "react";
import { UsernameProvider } from "./UsernameContext";
import { PaginationProvider } from "./PaginationContext";
import { GitProvider } from "./GitContext";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UsernameProvider>
      <PaginationProvider>
        <GitProvider>{children}</GitProvider>
      </PaginationProvider>
      ,
    </UsernameProvider>
  );
};
