import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState(
    location.pathname.split("/")[2] || ""
  );
  const isNotHome = location.pathname.includes("/user");
  const headerStyle = isNotHome ? { boxShadow: "none" } : {};

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    navigate(`/user/${inputValue}/overview`);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (!isNotHome) {
      setInputValue("");
    }
  }, [location]);
  return (
    <>
      <header className="header" style={headerStyle}>
        <Link className="logo" to={`/`}>
          <img src="/assets/logo.png" alt="github" />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            className="serach_bar"
            type="text"
            placeholder="Type username"
            value={inputValue}
            onChange={handleChange}
            name="username"
          />
        </form>
      </header>
    </>
  );
};
export default Header;
