import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const BibliothequeItemLogic = (ref1, ref2, addToQueu) => {
  const [displayPlaylistModal, setDisplayPlaylistModal] = useState(false);
  const props = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleClickOutside = (event) => {
    if (ref1.current && !ref1.current.contains(event.target)) {
      if (ref2.current && !ref2.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
  };
  const handleClickMenu = (e) => {
    setShowMenu(!showMenu);
  };

  const handleClickAddToQueu = (e) => {
    addToQueu(e);
    setShowMenu(false);
  };

  const handleClickAddToPlaylist = (e) => {
    setDisplayPlaylistModal(true);
  };

  const handleClickPlaylist = (e, uri) => {
    const playlistId = e.currentTarget.dataset.id;
    props.addTrackToPlaylist(playlistId, uri);
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<p class='span-copied'>Correctly added !</p>"
    );
    setTimeout(() => {
      setDisplayPlaylistModal(false);
    }, 1100);
    props.getUserPlaylists();
  };

  return {
    handleClickAddToPlaylist,
    displayPlaylistModal,
    setDisplayPlaylistModal,
    handleClickPlaylist,
    handleClickMenu,
    handleClickAddToQueu,
    showMenu,
  };
};

export default BibliothequeItemLogic;
