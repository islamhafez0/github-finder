import { useGit } from "../hooks/useGit";
import { TUserData } from "../interface";
import Loader from "./Loader";
import UserCard from "./UserCard";

const Following = () => {
  const {
    following: users,
    isLoadingFollowing,
    getFollowingError,
    followingPage,
    followingTotalPages,
    loadFollowingNextPage,
    loadFollowingPrevPage,
  } = useGit();
  if (getFollowingError) {
    return <p className="error">{getFollowingError}</p>;
  }

  if (!isLoadingFollowing && users?.length === 0) {
    return (
      <p style={{ textAlign: "center", paddingTop: 35, fontWeight: 500 }}>
        This user is following no one!
      </p>
    );
  }

  return (
    <div className="tab">
      {isLoadingFollowing ? (
        <Loader />
      ) : (
        <>
          <div className="followers">
            {users.map((user: TUserData) => (
              <UserCard user={user} key={user.node_id} />
            ))}
          </div>
        </>
      )}
      {!isLoadingFollowing && (
        <div className="pagination">
          <button
            className={`${followingPage === 1 && "disabled"}`}
            disabled={followingPage === 1}
            onClick={loadFollowingPrevPage}
          >
            Previous
          </button>
          {followingPage} of {followingTotalPages}
          <button
            className={`${
              (followingPage === followingTotalPages ||
                followingTotalPages === 0) &&
              "disabled"
            }`}
            disabled={
              followingPage === followingTotalPages || followingTotalPages === 0
            }
            onClick={loadFollowingNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Following;
