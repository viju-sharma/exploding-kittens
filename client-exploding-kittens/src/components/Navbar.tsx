import { useState } from "react";
import { ActiveTab } from "../interfaces/ActiveTab.interface";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import { logout } from "../features/auth.slice";

const Navbar = () => {
  const [active, setActive] = useState<ActiveTab>("home");
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-white px-8 pt-2 shadow-md">
      <div className="-mb-px flex justify-center">
        <Link to={"/"}>
          <button className="text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8">
            Home
          </button>
        </Link>
        <Link to={"/leaderboard"}>
          <button className="text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8">
            Leader Board
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 ml-auto"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
