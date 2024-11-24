import { useEffect } from "react";
import { useGit } from "../hooks/useGit";
import Loader from "./Loader";
import UserCard from "./UserCard";
import { useLocation } from "react-router-dom";

const Following = () => {
  const {
    following: users,
    pagination,
    status,
    setPage,
    getUserFollowing,
  } = useGit();
  const username = useLocation().pathname.split("/")[2];
  const { currentPage, totalPages } = pagination.following;

  if (status.error.following) {
    return <p className="error">{status.error.following}</p>;
  }

  useEffect(() => {
    (async () => await getUserFollowing(username))();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="tab">
      {status.loading.following ? (
        <Loader />
      ) : (
        <>
          <div className="followers">
            {users.map((user) => (
              <UserCard user={user} key={user.node_id} />
            ))}
          </div>
        </>
      )}
      {!status.loading.following && users.length === 0 && (
        <p style={{ textAlign: "center", fontWeight: 500, fontSize: 14 }}>
          This user is following no one!
        </p>
      )}
      {!status.loading.following && users.length !== 0 && (
        <div className="pagination">
          <button
            className={`${currentPage === 1 && "disabled"}`}
            disabled={currentPage === 1}
            onClick={() => setPage("following", currentPage - 1)}
          >
            Previous
          </button>
          {currentPage} of {totalPages}
          <button
            className={`${currentPage === totalPages && "disabled"}`}
            disabled={currentPage === totalPages}
            onClick={() => setPage("following", currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Following;
