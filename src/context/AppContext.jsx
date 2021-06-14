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
  const [savedAlbums, setSavedAlbums] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [user, setUser] = useState();
  const [recommendedAlbums, setRecommendedAlbums] = useState(null);

  // Getting token from hash ==============================================================
  window.location.hash !== "" &&
    spotifyApi.setAccessToken(window.location.hash.split("=")[1]);

  // Fetch user info ========================================================================
  useEffect(() => {
    spotifyApi.getMe().then((response) => setUser(response));
  }, []);

  // Handle fetch Artists === Start =========================================================
  // Handle fetch Artists === Start =========================================================
  const settingFollowedArtists = useCallback(async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  }, []); // Fetch followed artist from user

  useEffect(() => {
    settingFollowedArtists();
  }, [settingFollowedArtists]);

  const followArtist = (id) => {
    spotifyApi.followArtists([id]);
    setTimeout(() => {
      settingFollowedArtists();
    }, 500);
  };

  const unfollowArtist = (id) => {
    spotifyApi.unfollowArtists([id]);
    setTimeout(() => {
      settingFollowedArtists();
    }, 500);
  };

  const checkIfArtistsAreFollowed = async (artists) => {
    const ids = artists.map((artist) => artist.id);
    const isFollowing = await spotifyApi.isFollowingArtists([ids]);
    return artists.map((artist, i) => {
      return { artist: artist, follow: isFollowing[i] };
    });
  };

  useEffect(() => {
    const getTopArtist = async () => {
      try {
        const topArtists = await spotifyApi.getMyTopArtists();
        const artistsWithFollow = await checkIfArtistsAreFollowed(
          topArtists.items
        );
        setTopArtists(artistsWithFollow);
      } catch (error) {
        console.log(error);
      }
    };
    getTopArtist();
  }, [setTopArtists, followedArtists]);
  // Handle fetch Artists === END =========================================================
  // Handle fetch Artists === END =========================================================

  // Handling fetch saved album and save and unsave album === START =======================
  // Handling fetch saved album and save and unsave album === START =======================
  const checkIfAlbumsAreFollowed = useCallback(async (albums) => {
    const ids = albums.map((album) => album.id);
    const isFollowing = await spotifyApi.containsMySavedAlbums([ids]);
    return albums.map((album, i) => {
      return { album: album, follow: isFollowing[i] };
    });
  }, []);

  const fetchSavedAlbums = useCallback(async () => {
    try {
      const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
      const savedAlbumsA = response.items.map((album) => album.album);
      const onlyAlbums = savedAlbumsA.filter((item) => {
        if (item.album_type !== "compilation") return item;
      });
      const albumsWithFollow = await checkIfAlbumsAreFollowed(onlyAlbums);
      setSavedAlbums(albumsWithFollow);
      console.log(albumsWithFollow);
    } catch (error) {
      console.log(error);
    }
  }, [checkIfAlbumsAreFollowed]);

  const getAlbumFromTopArtists = useCallback(() => {
    Promise.all(
      topArtists?.map((artist) =>
        spotifyApi.getArtistAlbums(artist.artist.id, {
          limit: 1,
        })
      )
    ).then(async (responses) => {
      const albums = responses.map((res) => res.items[0]);
      const albumsWithFollow = await checkIfAlbumsAreFollowed(albums);
      setRecommendedAlbums(albumsWithFollow);
    });
  }, [topArtists, checkIfAlbumsAreFollowed]);

  const fetchArtistAlbums = async (albumSelected) => {
    const artistAlbums = await spotifyApi.getArtistAlbums(
      albumSelected?.artists?.[0]?.id
    );
    const unique = artistAlbums.items.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.place === thing.place && t.name === thing.name)
    );
    const sorted = unique.sort((a, b) => a.release_date > b.release_date);
    const albumsWithFollow = await checkIfAlbumsAreFollowed(sorted);
    return albumsWithFollow;
  };

  useEffect(() => {
    getAlbumFromTopArtists();
  }, [getAlbumFromTopArtists]);

  useEffect(() => {
    fetchSavedAlbums();
  }, [fetchSavedAlbums]);

  const saveAlbum = (id) => {
    spotifyApi.addToMySavedAlbums([id]);
    setTimeout(() => {
      fetchSavedAlbums();
      getAlbumFromTopArtists();
    }, 500);
  };
  const unSaveAlbum = (id) => {
    spotifyApi.removeFromMySavedAlbums([id]);
    setTimeout(() => {
      fetchSavedAlbums();
      getAlbumFromTopArtists();
    }, 500);
  };

  // Handling fetch saved album and save and unsave album === END =========================
  // Handling fetch saved album and save and unsave album === END =========================

  // Handling fetch saved tracks and save and unsave tracks === START =====================
  // Handling fetch saved tracks and save and unsave tracks === START =====================
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
  // Handling fetch saved tracks and save and unsave tracks === END ==========================
  // Handling fetch saved tracks and save and unsave tracks === END ==========================

  // Handling fetch playlist and save and unsave playlist === START ==========================
  // Handling fetch playlist and save and unsave playlist === START ==========================
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

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi
        .getFeaturedPlaylists({ limit: 20 })
        .then((data) => {
          setFeaturedPlaylists(data.playlists.items);
        })
        .catch((error) => console.log(error));
    }; // Fetching featured playlist
    getFeaturedPlaylist();
  }, []);
  // Handling fetch playlist and save and unsave playlist === END ==========================
  // Handling fetch playlist and save and unsave playlist === END ==========================

  return (
    <Provider
      value={{
        fetchArtistAlbums,
        checkIfArtistsAreFollowed,
        recommendedAlbums,
        userPlaylists,
        getUserPlaylists,
        checkIfPlaylistIsFollowed,
        checkIfTrackIsSaved,
        checkIfAlbumsAreFollowed,
        user,
        saveAlbum,
        unSaveAlbum,
        savedTracks,
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        followedArtists,
        settingFollowedArtists,
        featuredPlaylists,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        uri,
        setUri,
        followArtist,
        unfollowArtist,
        topArtists,
        savedAlbums,
      }}>
      {props.children}
    </Provider>
  );
};
