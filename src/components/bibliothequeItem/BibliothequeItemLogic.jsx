import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const BibliothequeItemLogic = (ref1, ref2, addToQueu) => {
  const [displayPlaylistModal, setDisplayPlaylistModal] = useState(false);
  const props = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [trackCurrentlyPlayed, setTrackCurrentlyPlayed] = useState("");

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMyCurrentPlayingTrack();
    }, 5000);
    return () => clearInterval(interval);
  }, []); // call fetch current played track every 5 secong to change style bibliotheque item component

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMyCurrentPlayingTrack();
    }, 100);
    return () => clearTimeout(timeOut);
  }, [props.uri]); // call fetch current played track after 100ms  to change style bibliotheque item component when user change track

  const fetchMyCurrentPlayingTrack = () => {
    props.spotifyApi.getMyCurrentPlayingTrack().then((response) => {
      response && setTrackCurrentlyPlayed(response.item.name);
    });
  }; // Fetch currently played track

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
    props.spotifyApi.addTracksToPlaylist(playlistId, [uri]);
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<p class='span-copied'>Correctly added !</p>"
    );

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
    trackCurrentlyPlayed,
  };
};

export default BibliothequeItemLogic;
