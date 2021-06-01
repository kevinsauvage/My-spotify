import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarRightLogic = () => {
  const {
    spotifyApi,
    setSidebarRightIsOpen,
    handleLoader,
    scrollTop,
    setTracks,
    setPlaylistToPlay,
    setNameB,
    setDescription,
    sidebarRightIsOpen,
    setFollowers,
  } = useContext(AppContext);

  const [featuredPlaylists, setFeaturedPlaylists] = useState([]); // user featured playlist

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((data) => {
        setFeaturedPlaylists(data.playlists.items);
      });
    }; // Fetching featured playlist
    getFeaturedPlaylist();
  }, [spotifyApi]);

  const getRecomended = async (e) => {
    setSidebarRightIsOpen(false);
    handleLoader();
    scrollTop();
    const id = e.currentTarget.dataset.id;
    const recommendations = await fetchRecomendedGenres(id);
    setBannerInfoGenre(id);
    setTracks(recommendations.tracks);
    setPlaylistToPlay(recommendations.tracks);
  };

  const setBannerInfoGenre = (id) => {
    setNameB(id);
    setDescription(undefined);
    setFollowers(undefined);
  }; // Set the banner info fo genre  recomendation

  const fetchRecomendedGenres = async (id) => {
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: id,
      limit: 50,
    });
    return recommendations;
  }; // Get recommended track for a genre ID

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
    for (let i = 0; i <= list.length - 1; i++) {
      setTimeout(() => {
        list[i].classList.toggle("open");
      }, i * 25);
    }
  };

  const closeSidebar = () => {
    if (sidebarRightIsOpen) {
      setSidebarRightIsOpen(false);
    }
  };

  return {
    handleClick,
    categories,
    getRecomended,
    closeSidebar,
    featuredPlaylists,
  };
};

export default SidebarRightLogic;
