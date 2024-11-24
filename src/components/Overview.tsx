import UserLinks from "./UserLinks";
import { RiExternalLinkFill } from "react-icons/ri";
import LazyLoadImage from "./LazyLoadImage";
import { useGit } from "../hooks/useGit";
import Loader from "./Loader";

const Overview = () => {
  const { userData, status } = useGit();

  if (status.loading.user) {
    return <Loader />;
  }

  return (
    <div className="tab">
      {userData && (
        <>
          <div className="user row">
            <LazyLoadImage src={userData?.avatar_url} alt={userData?.name} />
            <div>
              <p>{userData?.name}</p>
              <span>@{userData?.login}</span>
            </div>
            <a href={userData?.html_url} className="user_url" target="_blank">
              <RiExternalLinkFill size={20} />
            </a>
          </div>
          <p>{userData?.bio}</p>
          <UserLinks userData={userData} />
        </>
      )}
    </div>
  );
};

export default Overview;
