import { useEffect } from "react";
import { useGit } from "../hooks/useGit";
import { useUsername } from "../hooks/useUsername";
import { Link, useLocation } from "react-router-dom";
import { IoMdBook } from "react-icons/io";
import { RiGitRepositoryLine } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import Overview from "./Overview";
import Repos from "./Repos";
import Following from "./Following";
import Followers from "./Followers";
import { TTabs } from "../interface";
import Loader from "./Loader";
import { abbreviateNumber } from "../utils";

const UserDetails = () => {
  const {
    userData,
    isLoadingUserData,
    isLoadingRepos,
    isLoadingFollowers,
    isLoadingFollowing,
    getUserError,
  } = useGit();
  const { setUsernameValue } = useUsername();
  const location = useLocation();
  useEffect(() => {
    setUsernameValue(location.pathname.split("/")[2]);
  }, [location]);
  const tabs: TTabs[] = [
    {
      label: "Overview",
      path: `/user/${userData?.login}/overview`,
      icon: <IoMdBook />,
    },
    {
      label: "Repositories",
      path: `/user/${userData?.login}/repos`,
      icon: <RiGitRepositoryLine />,
    },
    {
      label: "Following",
      path: `/user/${userData?.login}/following`,
      icon: <SlUserFollowing />,
    },
    {
      label: "Followers",
      path: `/user/${userData?.login}/followers`,
      icon: <FiUsers />,
    },
  ];

  if (getUserError !== "") {
    return (
      <p
        className="error"
        style={{
          marginTop: 40,
        }}
      >
        {getUserError}
      </p>
    );
  }
  return (
    <section className="userDetails">
      <div className="tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            className={`${location.pathname === tab.path ? "active" : ""}`}
          >
            {tab.icon}
            {tab.label}{" "}
            {(tab.path.includes("/repos") &&
              userData?.public_repos &&
              abbreviateNumber(userData?.public_repos!)) ||
              ""}
            {(tab.path.includes("/followers") &&
              userData?.followers &&
              abbreviateNumber(userData?.followers!)) ||
              ""}
            {(tab.path.includes("/following") &&
              userData?.following &&
              abbreviateNumber(userData?.following!)) ||
              ""}
          </Link>
        ))}
      </div>
      {isLoadingUserData ||
      isLoadingRepos ||
      isLoadingFollowers ||
      isLoadingFollowing ? (
        <Loader />
      ) : (
        <div className="tab_container">
          {location.pathname.includes("/overview") && (
            <Overview userData={userData!} />
          )}
          {location.pathname.includes("/repos") && <Repos />}
          {location.pathname.includes("/following") && <Following />}
          {location.pathname.includes("/followers") && <Followers />}
        </div>
      )}
    </section>
  );
};

export default UserDetails;
