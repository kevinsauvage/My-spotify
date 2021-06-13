import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const SidebarRightLogic = () => {
  const { spotifyApi, sidebarRightIsOpen, topArtists } = useContext(AppContext);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]); // user featured playlist
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums
  const [categories, setCategories] = useState([]);
  const [followedArtists, setFollowedArtists] = useState();

  useEffect(() => {
    spotifyApi
      .getAvailableGenreSeeds()
      .then((response) => setCategories(response.genres))
      .catch((error) => console.log(error));
  }, [spotifyApi]);

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi.getFeaturedPlaylists({ limit: 20 }).then((data) => {
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
  }, [spotifyApi, setTopTracks]);

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

  const dataConfig = [
    {
      id: 1,
      items: featuredPlaylists,
      link: "/Playlists",
      title: "Featured playlist",
    },
    {
      id: 2,
      items: topTracks,
      link: "/track",
      title: "Top tracks",
    },
    {
      id: 3,
      items: topArtists,
      link: "/artist",
      title: "Top artists",
    },
    {
      id: 4,
      items: savedAlbums,
      link: "/Albums",
      title: " Saved albums",
    },
    {
      id: 5,
      items: followedArtists,
      link: "/artist",
      title: "Followed Artists",
    },
    {
      id: 6,
      items: categories,
      link: "/category",
      title: "Categories",
    },
  ];

  return { dataConfig, sidebarRightIsOpen };
};

export default SidebarRightLogic;
