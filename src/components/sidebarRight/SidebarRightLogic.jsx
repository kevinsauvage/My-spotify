import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarRightLogic = () => {
  const {
    spotifyApi,
    setSidebarRightIsOpen,
    handleSidebarMenu,
    sidebarRightIsOpen,
    scrollbar,
    followedArtists,
    setFollowedArtists,
  } = useContext(AppContext);

  const [featuredPlaylists, setFeaturedPlaylists] = useState([]); // user featured playlist
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [topArtists, setTopArtists] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((data) => {
        setFeaturedPlaylists(data.playlists.items);
      });
    }; // Fetching featured playlist
    getFeaturedPlaylist();
  }, [spotifyApi]);

  useEffect(() => {
    const getTopTracks = async () => {
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const tracks = response.items;
      setTopTracks(tracks);
    };
    getTopTracks();
  }, [spotifyApi, setTopTracks, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getTopArtist = async () => {
      const topArtist = await spotifyApi.getMyTopArtists();
      setTopArtists(topArtist.items);
    };
    getTopArtist();
  }, [setTopArtists, spotifyApi]);

  useEffect(() => {
    const getSavedAlbums = async () => {
      const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
      const albums = response.items.map((item) => item.album);
      setSavedAlbums(albums);
    }; // Fetching the Albums saved by the user
    getSavedAlbums();
  }, [spotifyApi]);

  useEffect(() => {
    const settingFollowedArtists = async () => {
      const response = await spotifyApi.getFollowedArtists({ limit: 50 });
      setFollowedArtists(response.artists.items);
    }; // Fetch followed artist from user
    settingFollowedArtists();
  }, [spotifyApi, setFollowedArtists]);

  const categories = [
    { name: "chill", id: "chill" },
    { name: "pop", id: "pop" },
    { name: "sleep", id: "sleep" },
    { name: "party", id: "party" },
    { name: "metal", id: "metal" },
    { name: "rock", id: "rock" },
    { name: "jazz", id: "jazz" },
    { name: "romance", id: "romance" },
    { name: "soul", id: "soul" },
    { name: "classical", id: "classical" },
    { name: "latin", id: "latin" },
    { name: "blues", id: "blues" },
    { name: "funk", id: "funk" },
    { name: "punk", id: "punk" },
    { name: "country", id: "country" },
  ];

  const dataConfig = [
    {
      id: 1,
      items: categories,
      link: "/category",
      title: "Categories",
    },
    {
      id: 2,
      items: featuredPlaylists,
      link: "/playlist",
      title: "Featured playlist",
    },
    {
      id: 3,
      items: topTracks,
      link: "/track",
      title: "Top tracks",
    },
    {
      id: 4,
      items: topArtists,
      link: "/artist",
      title: "Top artists",
    },
    {
      id: 5,
      items: savedAlbums,
      link: "/album",
      title: " Saved albums",
    },
    {
      id: 6,
      items: followedArtists,
      link: "/artist",
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
