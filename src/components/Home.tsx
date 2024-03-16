import { ChangeEvent, useState } from "react";
import { usePopularRepos } from "../hooks/usePopularRepos";
import { TPopularRepo } from "../interface";
import Loader from "./Loader";
import RepoBox from "./RepoBox";
const Home = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const formattedDate = date.toISOString().split("T")[0];
  const [selectValue, setSelectValue] = useState<string>("");
  const {
    popularRepos: repos,
    loading,
    error,
    nextPage,
    prevPage,
    totalPages,
    page,
    setSelectedLanguage,
  } = usePopularRepos();

  const handleLangugaeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setSelectValue(selectedLanguage);
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage);
    }
    if (selectedLanguage === "") {
      setSelectedLanguage(`created:>${formattedDate}`);
    }
  };

  return (
    <section className="trending">
      {error && <p className="error">{error}</p>}
      {!error && !loading && (
        <>
          <div className="trending_welcome">
            <h2>Trending</h2>
            <p>See what the GitHub community is most excited about today.</p>
          </div>
          <div className="filtering">
            <label htmlFor="language">
              Filter repositories
              <select
                name="language"
                id="language"
                value={selectValue}
                onChange={handleLangugaeChange}
              >
                <option value="">All Languages</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="CSS">C++</option>
                <option value="Sass">Ruby</option>
              </select>
            </label>
          </div>
        </>
      )}
      {loading && <Loader />}
      {!loading && !error && (
        <ul className="trending_container">
          {repos?.map((repo: TPopularRepo) => {
            return <RepoBox repo={repo} key={repo.id} />;
          })}
        </ul>
      )}
      {!loading && !error && (
        <div className="pagination">
          <button
            disabled={page === 1}
            className={`${page === 1 && "disabled"}`}
            onClick={prevPage}
          >
            Previous
          </button>
          {page} of {totalPages}
          <button
            disabled={page === totalPages}
            id="nextPagePopular"
            className={`${page === totalPages && "disabled"}`}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
