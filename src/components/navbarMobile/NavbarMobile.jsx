import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./NavbarMobile.scss";

const NavbarMovil = () => {
  const {
    setSidebarLeftIsOpen,
    sidebarRightIsOpen,
    setSidebarRightIsOpen,
    sidebarLeftIsOpen,
  } = useContext(AppContext);

  const openSidebarRight = () => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(!sidebarRightIsOpen);
  };
  const openSidebarLeft = () => {
    setSidebarRightIsOpen(false);
    setSidebarLeftIsOpen(!sidebarLeftIsOpen);
  };

  return (
    <div className="navbarMovil">
      <button onClick={openSidebarLeft}>Search</button>
      <button onClick={openSidebarRight}>Bibliotheque</button>
    </div>
  );
};

export default NavbarMovil;
