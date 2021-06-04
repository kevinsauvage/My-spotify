import "./Main.scss";
import Content from "../../route/content/Content";
import ControlBar from "../../components/controlBar/ControlBar";
import NavbarMobile from "../../components/navbarMobile/NavbarMobile";

const Main = () => {
  return (
    <div className="main">
      <div id="my-scrollbar">
        <Content />
      </div>
      <ControlBar />
      <NavbarMobile />
    </div>
  );
};

export default Main;
