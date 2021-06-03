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
    fetchPlaylistContent,
    topTracks,
    setTrackShow,
    topArtists,
    setArtistShow,
    savedAlbums,
    getAlbumTracks,
    followedArtists,
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
    const id = e.currentTarget.dataset.name;
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: id,
      limit: 50,
    });
    setNameB(id);
    setDescription(undefined);
    setFollowers(undefined);
    setTracks(recommendations.tracks);
    setPlaylistToPlay(recommendations.tracks);
  };

  const categories = [
    { name: "chill" },
    { name: "pop" },
    { name: "sleep" },
    { name: "party" },
    { name: "metal" },
    { name: "rock" },
    { name: "jazz" },
    { name: "romance" },
    { name: "soul" },
    { name: "classical" },
    { name: "latin" },
    { name: "blues" },
    { name: "funk" },
    { name: "punk" },
    { name: "country" },
  ];

  const dataConfig = [
    {
      id: 1,
      items: categories,
      link: "/Biblio",
      fn: getRecomended,
      title: "Categories",
    },
    {
      id: 2,
      items: featuredPlaylists,
      link: "/Biblio",
      fn: fetchPlaylistContent,
      title: "Featured playlist",
    },
    {
      id: 3,
      items: topTracks,
      link: "/Track",
      fn: setTrackShow,
      title: "Top tracks",
    },
    {
      id: 4,
      items: topArtists,
      link: "/Artist",
      fn: setArtistShow,
      title: "Top artists",
    },
    {
      id: 5,
      items: savedAlbums,
      link: "/Biblio",
      fn: getAlbumTracks,
      title: " Saved albums",
    },
    {
      id: 6,
      items: followedArtists,
      link: "/Artist",
      fn: setArtistShow,
      title: "Followed Artists",
    },
  ];

  const closeSidebar = () => {
    if (sidebarRightIsOpen) {
      setSidebarRightIsOpen(false);
    }
  };

  return { closeSidebar, dataConfig };
};

export default SidebarRightLogic;
