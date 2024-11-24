import axios from "axios";

export const fetchUserDetails = async (username: string) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      getAuthHeaders()
    );
    return data;
  } catch (error) {
    console.error("Error getting user details");
    throw error;
  }
};

export const fetchUserRepos = async (username: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30&page=${page}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    console.error("Error getting user repositories.");
    throw error;
  }
};

export const fetchUserFollowers = async (
  username: string,
  page: number = 1
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/followers?per_page=40&page=${page}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    console.error("Error getting user followers");
    throw error;
  }
};

export const getUserFollowing = async (username: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/following?per_page=40&page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error getting user following list");
    throw error;
  }
};

export const fetchUserFollowing = async (username: string, page: number) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/following?per_page=40&page=${page}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPopularRepos = async (
  page: number,
  selectedLanguage: string
) => {
  const params = {
    q: `created:>2024-11-01 stars:>10 sort:stars`,
    sort: "stars",
    order: "desc",
    page: page,
    per_page: 30,
  };
  if (selectedLanguage) {
    params["q"] += ` language:${selectedLanguage}`;
  }
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        params,
        ...getAuthHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAuthHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
  return { auth: { username: "islamhafez0", password: token } };
};
