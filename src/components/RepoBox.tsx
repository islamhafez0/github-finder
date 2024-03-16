import { TPopularRepo } from "../interface";
import { CiStar } from "react-icons/ci";
import { GoRepoForked } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { timeAgo, abbreviateNumber } from "../utils";
import { bgStyles } from "../utils";
import LazyLoadImage from "./LazyLoadImage";
const RepoBox = ({ repo }: { repo: TPopularRepo }) => {
  const styles = bgStyles(repo?.language!);
  return (
    <li className="repoBox">
      <a href={repo.html_url} target="_blank">
        <RiGitRepositoryLine />
        {repo?.owner?.login}/<span>{repo.name}</span>
      </a>
      <p className="description">{repo.description}</p>
      <div className="repo_info">
        <div>
          <div>
            <span className="bg" style={styles}></span>
            {repo.language === null ? "uk" : repo.language}
          </div>
          <div>
            <CiStar size={18} />
            {abbreviateNumber(repo.stargazers_count)}
          </div>
          <div>
            <GoRepoForked size={16} />
            {abbreviateNumber(repo.forks!)}
          </div>
          <div>
            {" "}
            {repo.contributors && <small>Built By</small>}
            {repo.contributors &&
              repo.contributors.length > 0 &&
              repo.contributors
                .slice(0, 5)
                .map((avatar, inx) => (
                  <LazyLoadImage
                    key={inx}
                    src={avatar}
                    alt={`Avatart of ${avatar}`}
                  />
                ))}
          </div>
        </div>
        <div className="repo-timeAgo">{timeAgo(repo.created_at!)}</div>
      </div>
    </li>
  );
};

export default RepoBox;
