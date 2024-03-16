import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUsername } from "../hooks/useUsername";
import { usePagination } from "../hooks/usePagination";
import UserDetails from "./UserDetails";
import Home from "./Home";
import Header from "./Header";

function AppContent() {
  const { username } = useUsername();
  const {
    setPage,
    setFollowersPage,
    setFollowingPage,
    setTotalPages,
    setFollowersTotalPages,
    setFollowingTotalPages,
  } = usePagination();
  useEffect(() => {
    setPage(1);
    setFollowersPage(1);
    setFollowingPage(1);
    setTotalPages(0);
    setFollowersTotalPages(0);
    setFollowingTotalPages(0);
  }, [username]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/user/:username/:tab" element={<UserDetails />} />
      </Routes>
      <div className="copyright">
        &copy; Eslam Hafez {new Date().getFullYear()}
      </div>
    </>
  );
}
export default AppContent;
