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
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [newReleasesAlbums, setNewReleasesAlbums] = useState();

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
    try {
      const response = await spotifyApi.getFollowedArtists({ limit: 50 });
      const artists = response.artists.items.map((artist) => {
        return { item: artist, follow: true };
      });
      setFollowedArtists(artists);
    } catch (error) {
      console.log(error);
    }
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
    try {
      spotifyApi.unfollowArtists([id]);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      settingFollowedArtists();
    }, 500);
  };

  const checkIfArtistsAreFollowed = async (artists) => {
    const ids = artists.map((artist) => artist.id);
    if (ids.length === 0) return;
    const isFollowing = await spotifyApi.isFollowingArtists([ids]);
    return artists.map((artist, i) => {
      return { item: artist, follow: isFollowing[i] };
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      spotifyApi
        .getMyTopArtists()
        .then((response) => {
          if (!isMounted) return;
          return checkIfArtistsAreFollowed(response.items);
        })
        .then((response) => {
          if (!isMounted) return;
          setTopArtists(response);
        })
        .catch((error) => {
          if (!isMounted) return;
          console.log(error);
        });
    }
    return () => (isMounted = false);
  }, [setTopArtists, followedArtists]);
  // Handle fetch Artists === END =========================================================
  // Handle fetch Artists === END =========================================================

  // Handling fetch saved album and save and unsave album === START =======================
  // Handling fetch saved album and save and unsave album === START =======================
  const checkIfAlbumsAreFollowed = useCallback(async (albums) => {
    const ids = albums.map((album) => album.id);
    if (ids.length === 0) return;
    const isFollowing = await spotifyApi.containsMySavedAlbums([ids]);
    return albums.map((album, i) => {
      return { item: album, follow: isFollowing[i] };
    });
  }, []);

  const fetchSavedAlbums = useCallback(async () => {
    try {
      const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
      const savedAlbumsA = response.items.map((album) => album.album);
      // eslint-disable-next-line array-callback-return
      const onlyAlbums = savedAlbumsA.filter((item) => {
        if (item.album_type !== "compilation") return item;
      });
      const albumsWithFollow = await checkIfAlbumsAreFollowed(onlyAlbums);
      setSavedAlbums(albumsWithFollow);
    } catch (error) {
      console.log(error);
    }
  }, [checkIfAlbumsAreFollowed]);

  const getAlbumFromTopArtists = useCallback(() => {
    Promise.all(
      topArtists?.map((artist) =>
        spotifyApi.getArtistAlbums(artist.item.id, {
          limit: 1,
        })
      )
    ).then(async (responses) => {
      const albums = responses.map((res) => res.items[0]);
      const albumsWithFollow = await checkIfAlbumsAreFollowed(albums);
      setRecommendedAlbums(albumsWithFollow);
    });
  }, [topArtists, checkIfAlbumsAreFollowed]);

  const fetchArtistAlbums = async (id, signal) => {
    const artistAlbums = await spotifyApi.getArtistAlbums(id, { signal });
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
    const getNewReleases = async () => {
      const response = await spotifyApi.getNewReleases({ limit: 50 });
      const albumWithFollow = await checkIfAlbumsAreFollowed(
        response.albums.items
      );
      setNewReleasesAlbums(albumWithFollow);
    };
    getNewReleases();
  }, [checkIfAlbumsAreFollowed]);

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
  const getLikedTracks = useCallback(async () => {
    try {
      const response = await spotifyApi.getMySavedTracks({
        limit: 50,
      });
      const tracks = response.items.map((item) => item.track);
      const tracksWithFollow = await checkIfTrackIsSaved(tracks);
      setSavedTracks(tracksWithFollow);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getLikedTracks();
  }, [getLikedTracks]);

  const checkIfTrackIsSaved = async (tracks) => {
    const ids = tracks.map((track) => track?.id);
    if (ids.length === 0) return;
    const response = await spotifyApi.containsMySavedTracks([ids]);
    return tracks.map((track, i) => {
      return { item: track, follow: response[i] };
    });
  };

  const unSaveTrack = (id) => {
    spotifyApi.removeFromMySavedTracks([id]);
    setTimeout(() => {
      getLikedTracks();
    }, 500);
  }; // unsave track and update the view

  const saveTrack = (id) => {
    spotifyApi.addToMySavedTracks([id]);
    setTimeout(() => {
      getLikedTracks();
    }, 500);
  }; // Save track and update the view

  useEffect(() => {
    const getTopTracks = async () => {
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const trackWithFollow = await checkIfTrackIsSaved(response.items);
      setTopTracks(trackWithFollow);
    };
    getTopTracks();
  }, [setTopTracks]);
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
    console.log("eeee");
    const response = await spotifyApi.getUserPlaylists({ limit: 50 });
    const playlists = response.items.map((item) => {
      return { item: item };
    });
    setUserPlaylists(playlists);
  }, []);

  useEffect(() => {
    getUserPlaylists();
  }, [getUserPlaylists]);

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi
        .getFeaturedPlaylists({ limit: 20 })
        .then((data) => {
          const playlists = data.playlists.items.map((item) => {
            return { item: item };
          });
          setFeaturedPlaylists(playlists);
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
        topTracks,
        fetchArtistAlbums,
        checkIfArtistsAreFollowed,
        recommendedAlbums,
        userPlaylists,
        getUserPlaylists,
        checkIfPlaylistIsFollowed,
        checkIfTrackIsSaved,
        checkIfAlbumsAreFollowed,
        user,
        unSaveTrack,
        saveTrack,
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
        newReleasesAlbums,
      }}>
      {props.children}
    </Provider>
  );
};
