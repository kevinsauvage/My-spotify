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
  }, []);

  const handleClickOutside = (event) => {
    if (ref1.current && !ref1.current.contains(event.target)) {
      if (ref2.current && !ref2.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
  };

  const handleClickMenu = (e) => {
    setShowMenu(!showMenu);
  }; // display playlist modal on user click

  const handleClickAddToQueu = (e) => {
    addToQueu(e);
    setShowMenu(false);
  };

  const handleClickAddToPlaylist = (e) => {
    setDisplayPlaylistModal(true);
  }; // display user playlist modal

  const handleClickPlaylist = (e, uri) => {
    const playlistId = e.currentTarget.dataset.id;
    props.spotifyApi.addTracksToPlaylist(playlistId, [uri]);
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<p class='span-copied'>Correctly added !</p>"
    ); // Add new track to a user playlist playlist
    props.getUserPlaylists(); // Fetch the user playlist after adding new track to a playlist
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
