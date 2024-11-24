import { useEffect } from "react";
import { useGit } from "../hooks/useGit";
import Loader from "./Loader";
import UserCard from "./UserCard";
import { useLocation } from "react-router-dom";

const Followers = () => {
  const {
    followers: users,
    getUserFollowers,
    pagination,
    status,
    setPage,
  } = useGit();
  const { currentPage, totalPages } = pagination.followers;
  if (status.error.followers) {
    return <div className="error">{status.error.followers}</div>;
  }

  const username = useLocation().pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      await getUserFollowers(username);
    })();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="tab">
      {status.loading.followers ? (
        <Loader />
      ) : (
        <>
          <div className="followers">
            {users.map((user) => (
              <UserCard user={user} key={user?.node_id} />
            ))}
          </div>
          {!status.loading.following && users.length === 0 && (
            <p style={{ textAlign: "center", fontWeight: 500, fontSize: 14 }}>
              This user is following no one!
            </p>
          )}
          {!status.loading.followers && users.length !== 0 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                className={`${currentPage === 1 && "disabled"}`}
                onClick={() => setPage("followers", currentPage - 1)}
              >
                Previous
              </button>
              {currentPage} of {totalPages}
              <button
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages && "disabled"}`}
                onClick={() => setPage("followers", currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Followers;
