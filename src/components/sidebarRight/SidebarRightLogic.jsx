import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarRightLogic = () => {
  const props = useContext(AppContext);

  const getRecomended = async (e) => {
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
    e.currentTarget.nextElementSibling.classList.toggle(
      "sidebarRight__categoryItems__open"
    );
  };

  return { handleClick, categories, getRecomended };
};

export default SidebarRightLogic;
