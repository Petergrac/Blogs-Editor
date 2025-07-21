import { NavLink } from "react-router-dom";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../api/api";
import Loading from "./loadingComponent";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  const navLink = ({ isActive }) =>
    isActive ? "active" : "text-white font-bold";
  // Fetch user data
  const userId = localStorage.getItem('currentUser')
  const{data, error, isLoading} = useQuery({
    queryKey: ["UserDetails"],
    queryFn: ()=> getUserDetails(userId)
  });
  if(isLoading){
    return <Loading />
  }
  if(error){
    const status = error?.response?.status;
    if(status === 401){
      return navigate('/')
    }
    if(status === 404){
      return <p>User Could not be found</p>
    }
    return <p>Make sure you registered as an author in the blogpost apk</p>
  }
  return (
    <div className="sticky top-0 z-100">
      <div className="flex justify-between bg-slate-800">
        <h1 className="name-text libertinus">Welcome {data.username}</h1>
        <h1 className="name-text libertinus text-xl md:text-3xl">{data.email}</h1>
      </div>
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
