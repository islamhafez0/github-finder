import { useGit } from "../hooks/useGit";
import { TUserData } from "../interface";
import Loader from "./Loader";
import UserCard from "./UserCard";

const Followers = () => {
  const {
    followers: users,
    isLoadingFollowers,
    getFollowersError,
    followersPage,
    followersTotalPages,
    loadFollowersNextPage,
    loadFollowersPrevPage,
  } = useGit();

  if (getFollowersError) {
    return <div className="error">{getFollowersError}</div>;
  }

  if (users.length === 0 && !isLoadingFollowers) {
    return (
      <p style={{ textAlign: "center", paddingTop: 35, fontWeight: 500 }}>
        This user is followed by no one!
      </p>
    );
  }

  return (
    <div className="tab">
      {isLoadingFollowers ? (
        <Loader />
      ) : (
        <>
          <div className="followers">
            {users.map((user: TUserData) => (
              <UserCard user={user} key={user?.node_id} />
            ))}
          </div>
          {!isLoadingFollowers && (
            <div className="pagination">
              <button
                disabled={followersPage === 1}
                className={`${followersPage === 1 && "disabled"}`}
                onClick={loadFollowersPrevPage}
              >
                Previous
              </button>
              {followersPage} of {followersTotalPages}
              <button
                disabled={
                  followersPage === followersTotalPages ||
                  followersTotalPages === 0
                }
                className={`${
                  (followersPage === followersTotalPages ||
                    followersTotalPages === 0) &&
                  "disabled"
                }`}
                onClick={loadFollowersNextPage}
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
