import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarRightLogic = () => {
  const props = useContext(AppContext);

  const getRecomended = async (e) => {
    props.setSidebarRightIsOpen(false);
    props.handleLoader();
    props.scrollTop();
    const id = e.currentTarget.dataset.id;
    const recommendations = await props.fetchRecomendedGenres(id);
    props.setBannerInfoGenre(id);
    props.setTracks(recommendations.tracks);
    props.setPlaylistToPlay(recommendations.tracks);
  };

  const categories = [
    "chill",
    "pop",
    "sleep",
    "party",
    "metal",
    "rock",
    "jazz",
    "romance",
    "soul",
    "classical",
    "latin",
    "blues",
    "funk",
    "punk",
    "country",
  ];

  const handleClick = (e) => {
    const list = Array.from(e.currentTarget.nextElementSibling.children);
    list[0].classList.toggle("open");
    for (let i = 0; i <= list.length - 1; i++) {
      setTimeout(() => {
        list[i].classList.toggle("open");
      }, i * 40);
    }
  };

  const closeSidebar = () => {
    if (props.sidebarRightIsOpen) {
      props.setSidebarRightIsOpen(false);
    }
  };

  return { handleClick, categories, getRecomended, closeSidebar };
};

export default SidebarRightLogic;
