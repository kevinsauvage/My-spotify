import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLeftLogic = () => {
  const { sidebarLeftIsOpen, setSidebarLeftIsOpen, spotifyApi } =
    useContext(AppContext);
  const [user, setUser] = useState(); // user info

  const closeSidebar = () => {
    if (sidebarLeftIsOpen) {
      setSidebarLeftIsOpen(false);
    }
  };

  useEffect(() => {
    const getMe = async () => {
      const user = await spotifyApi.getMe();
      setUser(user);
    };
    getMe();
  }, [spotifyApi]);

  return {
    closeSidebar,
    sidebarLeftIsOpen,
  };
};

export default SidebarLeftLogic;
