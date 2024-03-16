import { ChangeEvent, useState } from "react";
import { useGit } from "../hooks/useGit";
import { TRepo } from "../interface";
import UserRepo from "./UserRepo";
import { v4 as uuidv4 } from "uuid";
const Repos = () => {
  const { repos, loadNextPage, loadPrevPage, page, totalPages, getReposError } =
    useGit();

  const [query, setQuery] = useState<string>("");
  const [filteredRepos, setFilteredRepos] = useState<TRepo[]>(repos);
  const { isLoadingRepos } = useGit();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setQuery(inputValue);
    const updatedRepos = repos.filter((repo: TRepo) => {
      return repo.name.toLowerCase().includes(inputValue.toLocaleLowerCase());
    });
    setFilteredRepos(updatedRepos);
  };

  if (getReposError) {
    return <p className="error">{getReposError}</p>;
  }

  if (!isLoadingRepos && repos.length === 0) {
    return (
      <p style={{ textAlign: "center", paddingTop: 35, fontWeight: 500 }}>
        {isLoadingRepos ? "" : "No available repositories!"}
      </p>
    );
  }

  return (
    <div className="tab">
      <div className="repos">
        {repos.length !== 0 && (
          <div className="filtering">
            <input
              className="search_repo"
              type="text"
              placeholder="Find a repository"
              onChange={handleChange}
              value={query}
            />
          </div>
        )}
        <div className="repos_container">
          {filteredRepos?.map((repo: TRepo) => {
            return (
              <UserRepo key={`${uuidv4()}-${repo?.node_id}`} repo={repo} />
            );
          })}
        </div>
        {!isLoadingRepos && repos.length !== 0 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              className={`${page === 1 && "disabled"}`}
              onClick={loadPrevPage}
            >
              Previous
            </button>
            {page} of {totalPages}
            <button
              disabled={page === totalPages || totalPages === 0}
              className={`${
                (page === totalPages || totalPages === 0) && "disabled"
              }`}
              onClick={loadNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repos;
