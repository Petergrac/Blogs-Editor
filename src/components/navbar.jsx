import { NavLink } from "react-router-dom";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../api/api";
import Loading from "./loadingComponent";
function Navbar() {
  const navLink = ({ isActive }) =>
    isActive ? "active" : "text-white font-bold";
  // Fetch user data
  const userId = localStorage.getItem("currentUser");
  const { data, error, isLoading } = useQuery({
    queryKey: ["UserDetails"],
    queryFn: () => getUserDetails(userId),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return console.log(error.message);
  }
  console.log(data.avatar);
  return (
    <div className="sticky top-0 z-100">
      <div className="flex justify-between bg-slate-800">
        <h1 className="name-text libertinus">Welcome {data.username}</h1>
        <div className="flex justify-center items-center">
          <div className="hidden md:flex">
            <img
              src={data.avatar}
              alt="avatar"
              className="object-cover w-16 h-16 rounded-full"
            />
          </div>
          <h1 className="name-text libertinus text-xl md:text-3xl">
            {data.email}
          </h1>
        </div>
      </div>
      <nav className="navbar inter">
        <NavLink className={navLink} to="/">
          Published
        </NavLink>
        <NavLink className={navLink} to="/drafts">
          Drafts
        </NavLink>
        <NavLink className={navLink} to="/new">
          New Post
        </NavLink>
      </nav>
    </div>
  );
}
export default Navbar;
