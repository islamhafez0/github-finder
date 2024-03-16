import axios from "axios";
import { useEffect, useState } from "react";
import { TContributor, TPopularRepo } from "../interface";
export const usePopularRepos = () => {
  const [popularRepos, setPopularRepos] = useState<TPopularRepo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedLaguage, setSelectedLanguage] = useState<string>("");
  useEffect(() => {
    const fetchPopularRepos = async () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const formattedDate = date.toISOString().split("T")[0];
      const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
      try {
        setLoading(true);
        const params = {
          q: `created:>${formattedDate}`,
          sort: "stars",
          order: "desc",
          page: page,
          per_page: 35,
        };
        if (selectedLaguage) {
          params.q = selectedLaguage;
        }
        const res = await axios.get(
          "https://api.github.com/search/repositories",
          {
            params,
            auth: {
              username: "islamhafez0",
              password: token,
            },
          }
        );
        const linkHeader = res.headers.link;
        let maxPage = 1;
        if (linkHeader) {
          const links = linkHeader.split(",");
          for (const link of links) {
            const match = link.match(/&page=(\d+)/);
            if (match) {
              const page = parseInt(match[1]);
              if (page > maxPage) {
                maxPage = page;
              }
            }
          }
        }
        setTotalPages(maxPage);
        const repos = await Promise.all(
          res?.data?.items?.map(async (item: TPopularRepo) => {
            const contributorsRes = await axios.get(
              `https://api.github.com/repos/${item.owner.login}/${item.name}/contributors`,
              {
                auth: {
                  username: "islamhafez0",
                  password: token,
                },
              }
            );
            const contributors = contributorsRes.data
              ? contributorsRes?.data?.map(
                  (contributor: TContributor) => contributor.avatar_url
                )
              : null;
            return {
              id: item.id,
              name: item.name,
              owner: {
                login: item.owner.login,
              },
              html_url: item.html_url,
              stargazers_count: item.stargazers_count,
              language: item.language,
              description: item.description,
              forks: item.forks,
              created_at: item.created_at,
              contributors,
            };
          })
        );
        setPopularRepos(repos);
      } catch (error) {
        console.log(error);
        setError(
          "Error fetching popular repositories. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPopularRepos();
  }, [page, selectedLaguage]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    } else {
      document.querySelector("#nextPagePopular")?.classList.add("disabled");
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    popularRepos,
    loading,
    error,
    nextPage,
    page,
    totalPages,
    prevPage,
    selectedLaguage,
    setSelectedLanguage,
  };
};
