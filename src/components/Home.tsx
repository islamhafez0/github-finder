import { useEffect } from "react";
import Loader from "./Loader";
import RepoBox from "./RepoBox";
import { usePopular } from "../hooks/usePopular";
const Home = () => {
  const { dispatch, getPopularRepos, state } = usePopular();
  const { loading, error, page, repos, selectedLanguage, totalPages } = state;
  useEffect(() => {
    getPopularRepos();
  }, [selectedLanguage, page]);
  let arrayOfPages = [];
  for (let i = 1; i <= totalPages; i++) {
    arrayOfPages.push(i);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section className="trending">
      <div className="trending_welcome">
        <h1>Trending</h1>
        <p>See what the GitHub community is most excited about today.</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ul className="trending_container">
          {repos?.map((repo) => {
            return <RepoBox repo={repo} key={repo.id} />;
          })}
        </ul>
      )}
      {!loading && !error && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })}
          >
            Previous
          </button>
          <span>
            {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
