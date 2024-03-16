import { ReactNode, createContext, useEffect, useState } from "react";
import { TGitContext, Repo, TUserData } from "../interface";
import axios from "axios";
import { useUsername } from "../hooks/useUsername";
import { usePagination } from "../hooks/usePagination";

export const GithubContext = createContext<TGitContext | undefined>(undefined);

export const GitProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<TUserData | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(false);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(false);

  const [getUserError, setGetUserError] = useState<string>("");
  const [getReposError, setGetReposError] = useState<string>("");
  const [getFollowersError, setGetFollowersError] = useState<string>("");
  const [getFollowingError, setGetFollowingError] = useState<string>("");
  const {
    page,
    totalPages,
    followersPage,
    followersTotalPages,
    followingPage,
    followingTotalPages,
    setPage,
    setFollowingPage,
    setFollowersPage,
    setTotalPages,
    setFollowersTotalPages,
    setFollowingTotalPages,
  } = usePagination();
  const { username } = useUsername();
  useEffect(() => {
    setGetReposError("");
    setGetFollowersError("");
    setGetFollowingError("");
    setGetUserError("");
    setUserData(null);
    setRepos([]);
    setFollowers([]);
    setFollowing([]);
    if (username) {
      fetchUserDetails();
      fetchRepos();
      fetchFollowers();
      fetchFollowing();
    }
  }, [username, page, followersPage, followingPage]);
  const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
  const authHedaers = {
    auth: {
      username: "islamhafez0",
      password: token,
    },
  };
  const fetchUserDetails = async () => {
    try {
      setIsLoadingUserData(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}`,
        authHedaers
      );
      setUserData(res.data);
    } catch (error) {
      console.log(error);
      setGetUserError("Error Fetching user details!");
    } finally {
      setIsLoadingUserData(false);
    }
  };

  const fetchRepos = async () => {
    try {
      setIsLoadingRepos(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30&page=${page}`,
        authHedaers
      );
      setRepos((prev) => [...prev, ...res.data]);
      const linkHeader = res.headers.link;
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch && totalPagesMatch.length > 1) {
          setTotalPages(parseInt(totalPagesMatch[1]));
        }
      }
    } catch (error) {
      console.log(error);
      setGetReposError("Error fetching repositories!");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const fetchFollowers = async () => {
    try {
      setIsLoadingFollowers(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}/followers?per_page=40&page=${followersPage}`,
        authHedaers
      );
      const linkHeader = res?.headers?.link;
      if (linkHeader) {
        const pagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (pagesMatch && pagesMatch.length > 1) {
          setFollowersTotalPages(parseInt(pagesMatch[1]));
        }
      }
      setFollowers(res.data);
    } catch (error) {
      console.log(error);
      setGetFollowersError("Error fetching followers!");
    } finally {
      setIsLoadingFollowers(false);
    }
  };

  const fetchFollowing = async () => {
    try {
      setIsLoadingFollowing(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}/following?per_page=40&page=${followingPage}`,
        authHedaers
      );
      const linkHeader = res.headers.link;
      if (linkHeader) {
        const pagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (pagesMatch && pagesMatch.length > 1) {
          setFollowingTotalPages(parseInt(pagesMatch[1]));
        }
      }
      setFollowing(res.data);
    } catch (error) {
      console.log(error);
      setGetFollowingError("Error fetching user's following!");
    } finally {
      setIsLoadingFollowing(false);
    }
  };

  const loadNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const loadPrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const loadFollowersNextPage = () => {
    if (followersPage < followersTotalPages) {
      setFollowersPage((prev) => prev + 1);
    }
  };

  const loadFollowersPrevPage = () => {
    if (followersPage > 1) {
      setFollowersPage((prev) => prev - 1);
    }
  };

  const loadFollowingNextPage = () => {
    setFollowingPage((prev) => prev + 1);
  };
  const loadFollowingPrevPage = () => {
    if (followingPage > 1) {
      setFollowingPage((prev) => prev - 1);
    }
  };
  return (
    <GithubContext.Provider
      value={{
        userData,
        repos,
        followers,
        following,

        isLoadingUserData,
        isLoadingRepos,
        isLoadingFollowers,
        isLoadingFollowing,

        getReposError,
        getFollowersError,
        getFollowingError,
        getUserError,

        page,
        totalPages,
        followersPage,
        followersTotalPages,
        followingPage,
        followingTotalPages,

        loadNextPage,
        loadPrevPage,
        loadFollowersNextPage,
        loadFollowersPrevPage,
        loadFollowingNextPage,
        loadFollowingPrevPage,

        setUserData,
        setRepos,
        setFollowers,
        setFollowing,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
