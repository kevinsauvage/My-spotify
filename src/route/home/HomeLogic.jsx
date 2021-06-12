import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const HomeLogic = () => {
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [topArtists, setTopArtists] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums
  const [newReleases, setNewReleases] = useState();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [dataFetch, setDataFetch] = useState([]);
  const [error, setError] = useState(false);

  const { spotifyApi } = useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const tracks = response.items;
      setTopTracks(tracks);
    };
    getTopTracks();
  }, [spotifyApi, setTopTracks]);

  useEffect(() => {
    const getTopArtist = async () => {
      try {
        const topArtist = await spotifyApi.getMyTopArtists();
        setTopArtists(topArtist.items);
      } catch (error) {
        setError(true);
      }
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
    const getNewReleases = async () => {
      const response = await spotifyApi.getNewReleases({ limit: 50 });
      setNewReleases(response.albums.items);
    };
    getNewReleases();
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
    Promise.all(
      featuredPlaylists?.map((playlist) =>
        spotifyApi.getPlaylist(playlist.id, {
          limit: 10,
        })
      )
    )
      .then((responses) => {
        return responses.map((re) => {
          const tracks = re.tracks.items.slice(0, 20).map((x) => x.track);
          return {
            id: re.name,
            items: tracks,
            title: re.name,
            link: "/track",
          };
        });
      })
      .then((data) => setDataFetch(data))
      .catch(() => {
        setError(true);
      });
  }, [spotifyApi, featuredPlaylists]); // fetch playlists from category array and set tracks to display in carousel

  const dataConfig = [
    {
      id: 1,
      items: newReleases,
      title: "New Release",
      link: "/Albums",
    },
    {
      id: 2,
      items: topTracks,
      title: "Your Top Tracks",
      link: "/track",
    },
    {
      id: 3,
      items: topArtists,
      title: "Your Top Artists",
      link: "/Artists",
    },
    {
      id: 4,
      items: savedAlbums,
      title: "Your Albums",
      link: "/Albums",
    },
  ];

  const array = Array.from(Array(6).keys()); // Make an array to display 8 card loader carussel

  return {
    array,
    dataConfig,
    dataFetch,
    error,
    savedAlbums,
    topArtists,
    topTracks,
    newReleases,
  };
};

export default HomeLogic;
