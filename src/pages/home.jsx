import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Navbar = lazy(()=> import('../components/navbar'))
function Home() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
}
export default Home;
