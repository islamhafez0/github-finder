import { ChangeEvent, useEffect, useState } from "react";
import { useUsername } from "../hooks/useUsername";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { setUsernameValue } = useUsername();
  const navigate = useNavigate();
  const location = useLocation();
  const isNotHome = location.pathname.includes("/user");
  const headerStyle = isNotHome ? { boxShadow: "none" } : {};
  useEffect(() => {
    if (location.pathname === "/") {
      setInputValue("");
    }
  }, [location]);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameValue(inputValue);
    if (inputValue.trim() === "") return;
    navigate(`/user/${inputValue}/overview`);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <header className="header" style={headerStyle}>
        <Link className="logo" to={`/`}>
          <img src="/assets/logo.png" alt="github" />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            className="searchBar"
            type="text"
            placeholder="Type Username"
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
