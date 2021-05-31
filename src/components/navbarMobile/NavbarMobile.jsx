import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./NavbarMobile.scss";

const NavbarMovil = () => {
  const props = useContext(AppContext);

  const openSidebarRight = () => {
    props.setSidebarLeftIsOpen(false);
    props.setSidebarRightIsOpen(!props.sidebarRightIsOpen);
  };
  const openSidebarLeft = () => {
    props.setSidebarRightIsOpen(false);
    props.setSidebarLeftIsOpen(!props.sidebarLeftIsOpen);
  };

  return (
    <div className="navbarMovil">
      <button onClick={openSidebarLeft}>Search</button>
      <button onClick={openSidebarRight}>Bibliotheque</button>
    </div>
  );
};

export default NavbarMovil;
