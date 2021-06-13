import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLogic = () => {
  const props = useContext(AppContext);

  const closeSidebar = () => {
    if (props?.sidebarLeftIsOpen) {
      props?.setSidebarLeftIsOpen(false);
    }
  };

  return {
    closeSidebar,
  };
};

export default SidebarLogic;
