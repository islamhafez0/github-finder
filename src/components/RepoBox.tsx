import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go";
import { timeAgo, abbreviateNumber } from "../utils";
import { bgStyles } from "../utils";
import { Repo } from "../types";
const RepoBox = ({ repo }: { repo: Repo }) => {
  const styles = bgStyles(repo?.language!);
  return (
    <li className="repoBox">
      <a href={repo.html_url} target="_blank">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <span>
          {repo?.owner?.login} / {repo.name}
        </span>
      </a>
      <p className="description">{repo.description}</p>
      <div className="repo_info">
        <div>
          <div>
            <span className="bg" style={styles}></span>
            {repo.language ?? "unknown"}
          </div>
          <div>
            <CiStar size={18} />
            {abbreviateNumber(repo.stargazers_count)}
          </div>
          <div>
            <GoRepoForked size={16} />
            {abbreviateNumber(repo.forks!)}
          </div>
        </div>
        <span className="repo-timeAgo">{timeAgo(repo.created_at!)}</span>
      </div>
    </li>
  );
};

export default RepoBox;
