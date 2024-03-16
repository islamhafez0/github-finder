import { Dispatch, ReactNode, SetStateAction } from "react";

export type TUserData = {
  login: string;
  avatar_url: string;
  bio: string;
  blog: string;
  name: string;
  public_repos: number;
  twitter_username: string;
  html_url: string;
  insta_username: string;
  followers: number;
  following: number;
  node_id: string;
};
export type TGitContext = {
  userData: TUserData | null;
  repos: any[];
  followers: any[];
  following: any[];
  isLoadingUserData: boolean;
  isLoadingRepos: boolean;
  isLoadingFollowers: boolean;
  isLoadingFollowing: boolean;
  getReposError: string;
  getFollowersError: string;
  getFollowingError: string;
  getUserError: string;
  page: number;
  totalPages: number;
  followersPage: number;
  followersTotalPages: number;
  followingPage: number;
  followingTotalPages: number;
  loadNextPage: () => void;
  loadPrevPage: () => void;
  loadFollowersNextPage: () => void;
  loadFollowersPrevPage: () => void;
  loadFollowingNextPage: () => void;
  loadFollowingPrevPage: () => void;
  setUserData: Dispatch<SetStateAction<TUserData | null>>;
  setRepos: Dispatch<SetStateAction<Repo[]>>;
  setFollowers: Dispatch<SetStateAction<never[]>>;
  setFollowing: Dispatch<SetStateAction<never[]>>;
};

export type TUsernameContext = {
  username: string;
  setUsernameValue: (val: string) => void;
};
export type PaginationContextType = {
  page: number;
  totalPages: number;
  followersPage: number;
  followersTotalPages: number;
  followingPage: number;
  followingTotalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setFollowersPage: React.Dispatch<React.SetStateAction<number>>;
  setFollowersTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setFollowingPage: React.Dispatch<React.SetStateAction<number>>;
  setFollowingTotalPages: React.Dispatch<React.SetStateAction<number>>;
};

export type Repo = {
  id: number;
  name: string;
};

export type TContributor = {
  avatar_url: string;
};

export type TPopularRepo = {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  stargazers_count: number;
  language: string | null;
  description: string;
  forks: number;
  created_at: string;
  contributors: string[];
};

export type TTabs = {
  label: string;
  path: string;
  icon: ReactNode;
};

export type TRepo = {
  node_id: string;
  topics: string[];
  name: string;
  description: string;
  language: string;
  license: {
    name: string;
  };
  forks_count: number;
  private: boolean;
  stargazers_count: number;
  updated_at: string;
  open_issues_count: number; // pulls
  html_url: string;
  watchers_count: number;
};
