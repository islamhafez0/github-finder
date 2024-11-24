import { ReactNode, createContext, useState } from "react";
import { GitContextTypes, Repo, User } from "../types";
import {
  fetchUserDetails,
  fetchUserFollowers,
  fetchUserRepos,
  fetchUserFollowing,
} from "../api";

export const GithubContext = createContext<GitContextTypes | undefined>(
  undefined
);

export const GitProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  const [status, setStatus] = useState({
    loading: { user: true, repos: true, followers: true, following: true },
    error: { user: "", repos: "", followers: "", following: "" },
  });

  const [pagination, setPagination] = useState({
    repos: { currentPage: 1, totalPages: 1 },
    followers: { currentPage: 1, totalPages: 1 },
    following: { currentPage: 1, totalPages: 1 },
  });

  const setTotalPages = (
    endpoint: keyof typeof pagination,
    totalPages: number
  ) => {
    setPagination((prev) => ({
      ...prev,
      [endpoint]: { ...prev[endpoint], totalPages },
    }));
  };

  const setPage = (endpoint: keyof typeof pagination, page: number) => {
    setPagination((prev) => ({
      ...prev,
      [endpoint]: { ...prev[endpoint], currentPage: page },
    }));
  };

  const resetPagianation = () => {
    setPagination({
      repos: { currentPage: 1, totalPages: 1 },
      followers: { currentPage: 1, totalPages: 1 },
      following: { currentPage: 1, totalPages: 1 },
    });
  };

  const getUserDetails = async (username: string) => {
    resetPagianation();
    setStatus((prev) => ({
      ...prev,
      loading: { ...prev.loading, user: true },
      error: { ...prev.error },
    }));
    try {
      const response = await fetchUserDetails(username);
      setUserData(response);
    } catch (error) {
      console.log(error);
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading },
        error: { ...prev.error, user: "Error getting user details" },
      }));
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading, user: false },
        error: { ...prev.error },
      }));
    }
  };

  const getUserRepositories = async (username: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: { ...prev.loading, repos: true },
      error: { ...prev.error },
    }));
    try {
      const response = await fetchUserRepos(
        username,
        pagination.repos.currentPage
      );
      setRepos(response.data);
      const linkHeader = response.headers.link;
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch && totalPagesMatch.length > 1) {
          setTotalPages("repos", parseInt(totalPagesMatch[1]));
        }
      }
    } catch (error) {
      console.log(error);
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading },
        error: { ...prev.error, repos: "Error getting user repositories!" },
      }));
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading, repos: false },
        error: { ...prev.error },
      }));
    }
  };

  const getUserFollowers = async (username: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: { ...prev.loading, followers: true },
    }));
    try {
      const response = await fetchUserFollowers(
        username,
        pagination.followers.currentPage
      );
      setFollowers(response.data);
      const linkHeader = response.headers.link;
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch) {
          setTotalPages("followers", parseInt(totalPagesMatch[1], 10));
        }
      }
    } catch (error) {
      console.log(error);
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading },
        error: { ...prev.error, followers: "Error getting user followers!" },
      }));
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading, followers: false },
        error: { ...prev.error },
      }));
    }
  };

  const getUserFollowing = async (username: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: { ...prev.loading, following: true },
      error: { ...prev.error },
    }));
    try {
      const response = await fetchUserFollowing(
        username,
        pagination.following.currentPage
      );
      setFollowing(response.data);
      const linkHeader = response?.headers.link;
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch) {
          setTotalPages("following", parseInt(totalPagesMatch[1], 10));
        }
      }
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading },
        error: {
          ...prev.error,
          following: "Error getting user-specific following",
        },
      }));
    } finally {
      setStatus((prev) => ({
        ...prev,
        loading: { ...prev.loading, following: false },
        error: { ...prev.error },
      }));
    }
  };

  return (
    <GithubContext.Provider
      value={{
        userData,
        repos,
        followers,
        following,
        status,
        getUserDetails,
        getUserRepositories,
        getUserFollowers,
        getUserFollowing,
        setPage,
        pagination,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
