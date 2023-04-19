import { useState } from "react";
import { ActiveTab } from "../interfaces/ActiveTab.interface";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import { logout } from "../features/auth.slice";
import classes from "./Navbar.module.css";

type NavbarProps = {
  activeTab: ActiveTab;
};

const Navbar = ({ activeTab }: NavbarProps) => {
  const [active, setActive] = useState<ActiveTab>(activeTab);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-white px-8  pt-2 py-1 shadow-md">
      <div className="-mb-px flex justify-center items-center py-2">
        <Link to={"/"}>
          <button
            className={[
              classes.navBtn,
              classes.hoverEffect,
              `${active === "home" && "scale-110"}`,
            ].join(" ")}
          >
            Home
          </button>
        </Link>
        <Link to={"/leaderboard"}>
          <button
            className={[
              classes.navBtn,
              classes.hoverEffect,
              `${active === "leader-board" && "scale-110"}`,
            ].join(" ")}
          >
            Leader Board
          </button>
        </Link>
        <Link to={"/game"}>
          <button
            className={[
              classes.navBtn,
              classes.hoverEffect,
              `${active === "game" && "scale-110"}`,
            ].join(" ")}
          >
            Game
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className={[classes.navBtn, "ml-auto"].join(" ")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
