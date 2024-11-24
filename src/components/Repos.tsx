import { useEffect } from "react";
import { useGit } from "../hooks/useGit";
import UserRepo from "./UserRepo";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const Repos = () => {
  const { repos, status, getUserRepositories, pagination, setPage } = useGit();
  const { currentPage, totalPages } = pagination.repos;
  const username = useLocation().pathname.split("/")[2];
  useEffect(() => {
    (async () => {
      await getUserRepositories(username);
    })();
    window.scrollTo(0, 0);
  }, [username, currentPage]);

  if (status.error.repos) {
    return <p className="error">{status.error.repos}</p>;
  }
  if (status.loading.repos) {
    return <Loader />;
  }

  if (!status.loading.repos && repos.length === 0) {
    return (
      <p style={{ textAlign: "center", paddingTop: 35, fontWeight: 500 }}>
        No available repositories!
      </p>
    );
  }

  return (
    <div className="tab">
      <div className="repos">
        <div className="repos_container">
          {repos?.map((repo) => {
            return (
              <UserRepo key={`${uuidv4()}-${repo?.node_id}`} repo={repo} />
            );
          })}
        </div>
        {!status.loading.following && repos.length === 0 && (
          <p style={{ textAlign: "center", fontWeight: 500, fontSize: 14 }}>
            This user has no repositories!
          </p>
        )}
        {!status.loading.repos && repos.length !== 0 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              className={`${currentPage === 1 && "disabled"}`}
              onClick={() => setPage("repos", currentPage - 1)}
            >
              Previous
            </button>
            {currentPage} of {totalPages}
            <button
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages && "disabled"}`}
              onClick={() => setPage("repos", currentPage + 1)}
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
