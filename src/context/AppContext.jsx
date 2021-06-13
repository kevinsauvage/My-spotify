import { createContext, useCallback, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export const AppContext = createContext();
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [uri, setUri] = useState(); // uri of track to play
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const [followedArtists, setFollowedArtists] = useState();
  const [savedTracks, setSavedTracks] = useState();
  const [topArtists, setTopArtists] = useState([]);
  const [savedAlbums, setSavedAllbums] = useState();
  const [userPlaylists, setUserPlaylists] = useState();

  const [user, setUser] = useState();

  window.location.hash !== "" &&
    spotifyApi.setAccessToken(window.location.hash.split("=")[1]);

  const settingFollowedArtists = useCallback(async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  }, []); // Fetch followed artist from user

  useEffect(() => {
    settingFollowedArtists();
  }, [settingFollowedArtists]);

  useEffect(() => {
    spotifyApi.getMe().then((response) => setUser(response));
  }, []);

  useEffect(() => {
    const getTopArtist = async () => {
      try {
        const topArtist = await spotifyApi.getMyTopArtists();
        setTopArtists(topArtist.items);
      } catch (error) {
        console.log(error);
      }
    };
    getTopArtist();
  }, [setTopArtists, followedArtists]);

  // Handling fetch saved album and save and unsave album === START

  const fetchSavedAlbums = useCallback(async () => {
    try {
      const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
      const savedAlbums = response.items.map((album) => album.album);
      const onlyAlbums = savedAlbums.filter((item) => {
        if (item.album_type !== "compilation") return item;
      });
      setSavedAllbums(onlyAlbums);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSavedAlbums();
  }, [fetchSavedAlbums]);

  const saveAlbum = (id) => {
    spotifyApi.addToMySavedAlbums([id]);
    setTimeout(() => {
      fetchSavedAlbums();
    }, 500);
  };
  const unSaveAlbum = (id) => {
    spotifyApi.removeFromMySavedAlbums([id]);
    setTimeout(() => {
      fetchSavedAlbums();
    }, 500);
  };
  const fetchIsFollowingAlbum = async (id) => {
    const response = await spotifyApi.containsMySavedAlbums([id]);
    return response[0];
  };

  // Handling fetch saved album and save and unsave album === END

  // Handling fetch saved tracks and save and unsave tracks === START

  useEffect(() => {
    const getLikedTracks = async () => {
      try {
        const response = await spotifyApi.getMySavedTracks({
          limit: 50,
        });
        const tracks = response.items.map((item) => item.track);
        setSavedTracks(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    getLikedTracks();
  }, []);

  const checkIfTrackIsSaved = useCallback(async (id) => {
    const response = await spotifyApi.containsMySavedTracks([id]);
    return response[0];
  }, []);

  // Handling fetch saved tracks and save and unsave tracks === END

  const checkIfPlaylistIsFollowed = async (id) => {
    try {
      const isFollowing = await spotifyApi.areFollowingPlaylist(id, [user?.id]);
      return isFollowing[0];
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserPlaylists = useCallback(async () => {
    const response = await spotifyApi.getUserPlaylists({ limit: 50 });
    setUserPlaylists(response.items);
  }, []);

  useEffect(() => {
    getUserPlaylists();
  }, [getUserPlaylists]);

  return (
    <Provider
      value={{
        userPlaylists,
        getUserPlaylists,
        checkIfPlaylistIsFollowed,
        checkIfTrackIsSaved,
        fetchIsFollowingAlbum,
        user,
        saveAlbum,
        unSaveAlbum,
        savedTracks,
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        followedArtists,
        settingFollowedArtists,
        fetchSavedAlbums,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        uri,
        setUri,
        topArtists,
        savedAlbums,
      }}>
      {props.children}
    </Provider>
  );
};
