import { NavLink } from "react-router-dom";
import "../App.css";
function Navbar() {
  const navLink = ({ isActive }) =>
    isActive ? "active" : "text-white font-bold";
  return (
    <div className="">
      <h1 className="name-text libertinus">Welcome [your name]</h1>
      <nav className="navbar inter">
        <NavLink className={navLink} to="/home/published">
          Published
        </NavLink>
        <NavLink className={navLink} to="/home/drafts">
          Drafts
        </NavLink>
        <NavLink className={navLink} to="/home/new">
          New Post
        </NavLink>
      </nav>
    </div>
  );
}
export default Navbar;
