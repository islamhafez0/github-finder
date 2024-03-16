import { ReactNode, createContext, useState } from "react";
import { PaginationContextType } from "../interface";

export const PaginationContext = createContext<
  PaginationContextType | undefined
>(undefined);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [followersPage, setFollowersPage] = useState<number>(1);
  const [followersTotalPages, setFollowersTotalPages] = useState<number>(0);
  const [followingPage, setFollowingPage] = useState<number>(1);
  const [followingTotalPages, setFollowingTotalPages] = useState<number>(0);

  return (
    <PaginationContext.Provider
      value={{
        page,
        totalPages,
        followersPage,
        followersTotalPages,
        followingPage,
        followingTotalPages,
        setPage,
        setTotalPages,
        setFollowersPage,
        setFollowersTotalPages,
        setFollowingPage,
        setFollowingTotalPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
