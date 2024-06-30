import { CiStar } from "react-icons/ci";
import { TRepo } from "../interface";
import { abbreviateNumber, timeAgo } from "../utils";
import { GoLaw, GoRepoForked } from "react-icons/go";
import { GoIssueOpened } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import { bgStyles } from "../utils";
const UserRepo = ({ repo }: { repo: TRepo }) => {
  const styles = bgStyles(repo?.language);
  return (
    <div className="repo">
      <div>
        <a href={repo.html_url} target="_blank">
          {repo.name}
        </a>
        {!repo.private && <span>Public</span>}
      </div>
      <p className="description">{repo.description}</p>
      <div className="topics">
        {repo.topics.map((topic) => (
          <p key={topic} className="topic">
            {topic}
          </p>
        ))}
      </div>
      <div className="info">
        <span>
          <div className={`bg`} style={styles}></div>
          {repo.language || "uk"}
        </span>
        {repo?.license?.name && (
          <span>
            <GoLaw size={22} />
            {repo.license?.name}
          </span>
        )}
        <span>
          <GoRepoForked size={16} />
          {abbreviateNumber(repo.forks_count)}
        </span>
        <span>
          <CiStar size={20} />
          {abbreviateNumber(repo.stargazers_count)}
        </span>
        <span>
          <GoIssueOpened size={16} />
          {abbreviateNumber(repo.open_issues_count)}
        </span>
        <span>
          <FaRegEye size={16} />
          {abbreviateNumber(repo.watchers_count)}
        </span>
        •<span>Updated {timeAgo(repo.updated_at)}</span>
      </div>
    </div>
  );
};

export default UserRepo;
