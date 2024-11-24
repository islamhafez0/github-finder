import { ReactNode } from "react";

export type User = {
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
export type Repo = {
  id: number;
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
  updated_at: string;
  open_issues_count: number; // pulls
  watchers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  stargazers_count: number;
  forks: number;
  created_at: string;
  contributors: string[];
};

export type GitContextTypes = {
  userData: User | null;
  repos: Repo[];
  followers: User[];
  following: User[];
  getUserDetails: (username: string) => Promise<void>;
  getUserRepositories: (username: string) => Promise<void>;
  getUserFollowers: (username: string) => Promise<void>;
  getUserFollowing: (username: string) => Promise<void>;
  setPage: (
    endpoint: "repos" | "followers" | "following",
    page: number
  ) => void;
  status: {
    loading: {
      user: boolean;
      repos: boolean;
      followers: boolean;
      following: boolean;
    };
    error: {
      user: string;
      repos: string;
      followers: string;
      following: string;
    };
  };
  pagination: {
    repos: { currentPage: number; totalPages: number };
    followers: { currentPage: number; totalPages: number };
    following: { currentPage: number; totalPages: number };
  };
};

export type TTabs = {
  label: string;
  path: string;
  icon: ReactNode;
};
