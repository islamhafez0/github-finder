import { Link } from "react-router-dom";
import { User } from "../types";
import LazyLoadImage from "./LazyLoadImage";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link to={`/user/${user?.login}/overview`} className="userCard">
      <div>
        <LazyLoadImage src={user.avatar_url} alt={user.name} />
        <span>@{user.login}</span>
      </div>
    </Link>
  );
};

export default UserCard;
