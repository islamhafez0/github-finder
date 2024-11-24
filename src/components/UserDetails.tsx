import { useGit } from "../hooks/useGit";
import { Link, useLocation } from "react-router-dom";
import { IoMdBook } from "react-icons/io";
import { RiGitRepositoryLine } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import Overview from "./Overview";
import Repos from "./Repos";
import Following from "./Following";
import Followers from "./Followers";
import { TTabs } from "../types";
import { abbreviateNumber } from "../utils";
import { useEffect } from "react";

const UserDetails = () => {
  const { userData } = useGit();
  const { pathname } = useLocation();
  const { getUserDetails } = useGit();
  const username = pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      await getUserDetails(username);
    })();
  }, [username]);

  const tabs: TTabs[] = [
    {
      label: "Overview",
      path: `/user/${username}/overview`,
      icon: <IoMdBook />,
    },
    {
      label: "Repositories",
      path: `/user/${username}/repositories`,
      icon: <RiGitRepositoryLine />,
    },
    {
      label: "Following",
      path: `/user/${username}/following`,
      icon: <SlUserFollowing />,
    },
    {
      label: "Followers",
      path: `/user/${username}/followers`,
      icon: <FiUsers />,
    },
  ];

  return (
    <section className="userDetails">
      <div className="tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            className={`${pathname === tab.path ? "active" : ""}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
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
      <div className="tab_container">
        {location.pathname.includes("/overview") && <Overview />}
        {location.pathname.includes("/repositories") && <Repos />}
        {location.pathname.includes("/following") && <Following />}
        {location.pathname.includes("/followers") && <Followers />}
      </div>
    </section>
  );
};

export default UserDetails;
