import { useEffect } from "react";
import { TUserData } from "../interface";
import UserLinks from "./UserLinks";
import { RiExternalLinkFill } from "react-icons/ri";
import LazyLoadImage from "./LazyLoadImage";

const Overview = ({ userData }: { userData: TUserData }) => {
  useEffect(() => {
    document.title = `${userData?.login} (${userData?.name || ""})`;
  }, []);
  return (
    <div className="tab">
      <>
        <div className="user row">
          <LazyLoadImage src={userData?.avatar_url} alt={userData?.name} />
          <div>
            <p>{userData?.name}</p>
            <span>{userData?.login}</span>
          </div>
          <a href={userData?.html_url} className="user_url" target="_blank">
            <RiExternalLinkFill size={20} />
          </a>
        </div>
        <p>{userData?.bio}</p>
        <UserLinks userData={userData} />
      </>
    </div>
  );
};

export default Overview;
