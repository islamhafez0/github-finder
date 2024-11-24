import { Routes, Route } from "react-router-dom";
import UserDetails from "./UserDetails";
import Home from "./Home";
import Header from "./Header";

function AppContent() {
  return (
    <div className="app">
      <div className="main" role="main">
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/user/:username/:tab" element={<UserDetails />} />
        </Routes>
      </div>
      <div className="copyright">
        &copy; Eslam Hafez {new Date().getFullYear()}
      </div>
    </div>
  );
}
export default AppContent;
