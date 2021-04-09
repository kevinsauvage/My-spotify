import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./NavbarMobile.scss";

const NavbarMovil = () => {
  const props = useContext(AppContext);

  return (
    <div className="navbarMovil">
      <button onClick={props.OpenSidebarLeft}>Search</button>
      <button onClick={props.OpenSidebarRight}>Bibliotheque</button>
    </div>
  );
};

export default NavbarMovil;
