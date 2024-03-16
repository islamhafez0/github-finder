import { TUserData } from "../interface";
import { IoIosLink } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SlUserFollowing } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { abbreviateNumber } from "../utils";
const UserLinks = ({ userData }: { userData: TUserData }) => {
  return (
    <div className="user info">
      {userData?.blog && (
        <span>
          <IoIosLink size={18} />
          <a target="_blank" href={userData?.blog}>
            {userData?.blog}
          </a>
        </span>
      )}
      {userData?.twitter_username && (
        <span>
          <FaXTwitter size={18} />
          <a
            target="_blank"
            href={`https://twitter.com/${userData?.twitter_username}`}
          >
            @{userData?.twitter_username}
          </a>
        </span>
      )}
      <span>
        <RiGitRepositoryLine />
        <Link to={`/user/${userData?.login}/repos`}>
          Repositories <small>{userData?.public_repos}</small>
        </Link>
      </span>
      <span>
        <Link to={`/user/${userData?.login}/followers`}>
          <FiUsers />
          {abbreviateNumber(userData?.followers)}
          <p>Followers</p>
        </Link>{" "}
        ·
        <Link to={`/user/${userData?.login}/following`}>
          <SlUserFollowing />
          {abbreviateNumber(userData?.following)}
          <p>Following</p>
        </Link>
      </span>
    </div>
  );
};

export default UserLinks;
