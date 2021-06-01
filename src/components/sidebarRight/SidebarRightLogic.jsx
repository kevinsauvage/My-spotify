import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarRightLogic = () => {
  const props = useContext(AppContext);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]); // user featured playlist

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      props.spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((data) => {
        setFeaturedPlaylists(data.playlists.items);
      });
    }; // Fetching featured playlist
    getFeaturedPlaylist();
  }, []);

  const getRecomended = async (e) => {
    props.setSidebarRightIsOpen(false);
    props.handleLoader();
    props.scrollTop();
    const id = e.currentTarget.dataset.id;
    const recommendations = await fetchRecomendedGenres(id);
    setBannerInfoGenre(id);
    props.setTracks(recommendations.tracks);
    props.setPlaylistToPlay(recommendations.tracks);
  };

  const setBannerInfoGenre = (id) => {
    props.setNameB(id);
    props.setDescription(undefined);
    props.setFollowers(undefined);
  }; // Set the banner info fo genre  recomendation

  const fetchRecomendedGenres = async (id) => {
    const recommendations = await props.spotifyApi.getRecommendations({
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
    if (props.sidebarRightIsOpen) {
      props.setSidebarRightIsOpen(false);
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
