import { Link } from "react-router-dom";
import { TUserData } from "../interface";
import LazyLoadImage from "./LazyLoadImage";

const UserCard = ({ user }: { user: TUserData }) => {
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
