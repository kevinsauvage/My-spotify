import { createContext, useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Scrollbar from "smooth-scrollbar";
import Cookies from "js-cookie";

export const AppContext = createContext();
const { Provider } = AppContext;
const spotifyApi = new SpotifyWebApi();

export const AppProvider = (props) => {
  const token = Cookies.get("spotifyAuthToken");
  spotifyApi.setAccessToken(token);
  const [user, setUser] = useState(); // user info
  const [playlists, setPlaylists] = useState([]); // user Playlist
  const [categories, setCategories] = useState(); // all categories
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]); // user featured playlist
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [topArtists, setTopArtists] = useState([]); // user top artists
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums
  const [currentPlayback, setCurrentPlayback] = useState([]); //user current playback
  const [tracks, setTracks] = useState([]); // tracks to display in biblio
  const [nameB, setNameB] = useState(""); // info to display in banner biblio
  const [description, setDescription] = useState(""); // description to display in header biblio
  const [followers, setFollowers] = useState(""); // follower to display in biblio
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [artistToShow, setArtistToShow] = useState(undefined); // Set artist to display on the show page
  const [artistTopTracks, setArtistTopTracks] = useState(undefined); // array of artist top tracks
  const [scrollbar, setScrollbar] = useState(); // storing scrollbar - scroll to top function
  const [input, setInput] = useState(""); // input search
  const [searchResultArtist, setSearchResultArtist] = useState(); // array of search result arstis
  const [isLoading, setIsLoading] = useState(false); // spinner loader on each page
  const [firstLoad, setFirstLoad] = useState(true); // display spinner loader for first render
  const [uri, setUri] = useState(); // uri of track to play
  const [deviceId, setDeviceId] = useState(); // id of user device if the user is playing something
  const [playlistToPlay, setPlaylistToPlay] = useState(); // array of the playlist to start if push play btn
  const [showSearch, setShowSearch] = useState(false); // show or not the search box
  const [playlistSearchResult, setPlaylistSearchResult] = useState();
  const [savedTracks, setSavedTracks] = useState(); // ueser saved track
  const [isFollowing, setIsFollowing] = useState(false);
  const [followedArtists, setFollowedArtists] = useState(); // get user followed artist
  const [artistAlbums, setArtistAlbums] = useState(); // get artist albums
  const [newReleases, setNewReleases] = useState();
  const [trackCurrentlyPlayed, setTrackCurrentlyPlayed] = useState("");
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false);
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false);

  useEffect(() => {
    setScrollbar(Scrollbar.get(document.querySelector("#my-scrollbar")));
    initialFetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMyCurrentPlayingTrack();
    }, 5000);
    return () => clearInterval(interval);
  }, []); // call fetch current played track every 5 secong to change style bibliotheque item component

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMyCurrentPlayingTrack();
    }, 100);
    return () => clearTimeout(timeOut);
  }, [uri]); // call fetch current played track after 100ms  to change style bibliotheque item component when user change track

  const getMyCurrentPlayingTrack = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((response) => {
      response && setTrackCurrentlyPlayed(response.item.name);
    });
  }; // Fetch currently played track

  const disableFirstLoader = () => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 4000);
  }; // Disable first loader after 4 secondes

  const initialFetch = () => {
    getTopTracks();
    getMe();
    getUserPlaylists();
    getLikedTracks();
    getCategories();
    getFeaturedPlaylist();
    getTopArtist();
    getSavedAlbums();
    settingFollowedArtists();
    getNewReleases();
    disableFirstLoader();
    getNowPlaying();
  };

  // Fetching user info -----------------------------------------------------------------------------------------Fetching user info-----------

  const getMe = async () => {
    const user = await spotifyApi.getMe();
    setUser(user);
  }; // Getting user profil

  const getUserPlaylists = async () => {
    const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
    setPlaylists(userPlaylist.items);
  }; // Getting user playlist

  const getCategories = async () => {
    const categories = await spotifyApi.getCategories({ limit: 50 });
    setCategories(categories.categories.items);
  }; // Fetching Categorys

  const getFeaturedPlaylist = () => {
    spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((data) => {
      setFeaturedPlaylists(data.playlists.items);
    });
  }; // Fetching featured playlist

  const getNowPlaying = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    if (response) {
      setCurrentPlayback(response);
      setUri(response.item.uri); // If something is playing in one of the user device, it will fetch the track and play it
      setDeviceId(response.device.id); // Set the device for the control bar player
    }
  }; // Fetching now playing,

  const getTopTracks = async () => {
    const topTracks = await spotifyApi.getMyTopTracks({ limit: 50 });
    setTopTracks(topTracks.items); // Seting top tracks of user
    setNameB("Top Tracks"); // Setting the name to display
    initialSetting(topTracks); // Calling initial setting with the data receive
    const uris = topTracks.items.map((track) => track.uri);
    if (!uri) setUri(uris); // Setting the uris to play after first render only if no track is actually playing in any of user device
  }; // Getting top tracks, only run once

  const getTopArtist = async () => {
    const topArtist = await spotifyApi.getMyTopArtists();
    setTopArtists(topArtist.items);
  }; // Fetching the top artist of the user

  const getSavedAlbums = async () => {
    const albums = await spotifyApi.getMySavedAlbums({ limit: 50 });
    setSavedAlbums(albums.items);
  }; // Fetching the Albums saved by the user

  const getLikedTracks = async () => {
    const savedTracks = await spotifyApi.getMySavedTracks({ limit: 50 });
    const itemReduce = savedTracks.items.map((item) => item.track);
    setSavedTracks(itemReduce);
  };

  const fetchArtistAlbums = async (id) => {
    const artistAlbums = await spotifyApi.getArtistAlbums(id);
    const unique = artistAlbums.items.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.place === thing.place && t.name === thing.name)
    );
    const sorted = unique.sort((a, b) => {
      return a.release_date > b.release_date;
    });
    setArtistAlbums(sorted);
  };

  const getArtistTopTracks = async (id) => {
    const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", 100);
    setArtistTopTracks(topTracks.tracks);
  }; // get artist top tracks

  const getNewReleases = async () => {
    const response = await spotifyApi.getNewReleases({ limit: 50 });
    setNewReleases(response.albums.items);
  };

  const settingFollowedArtists = async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  }; // Fetch followed artist from user

  const initialSetting = async (data) => {
    setNameB("Top Tracks");
    setPlaylistToPlay(data.items); // Setting playlist to play with top track result
    setTrackToShow(data.items[0]); // setting the track to show with the best track of the top tracks - displayed in tracks show
    setTracks(data.items); // Setting the tracks to display in biblio with top tracks data to display in biblio
    getArtistRelatedArtists(data.items[0].artists[0].id); // Setting the artists in relation with the best of top tracks track to display in artist show
    getRecommendationsTrackFromArtist(data.items[0].artists[0].id); // Settind a list of recomendation tracks from the best track in top tracks, - displyed in artist show
    const artistToShow = await spotifyApi.getArtist(
      data.items[0].artists[0].id
    );
    fetchArtistAlbums(data.items[0].artists[0].id);
    setArtistToShow(artistToShow); // Fetching the artist corresponding to best track of top tracks
    getArtistTopTracks(data.items[0].artists[0].id); // Calling function to set the current artist top track and display in artist show
  }; // Setting what to display in every page at first render

  // General function -----------------------------------------------------------------------------------------------General function

  const setPlaylistUri = () => {
    if (playlistToPlay.lenght === 1) {
      setUri(playlistToPlay);
    } else {
      const uris = playlistToPlay.map((track) => track.uri);
      setUri(uris);
    }
  }; // Seting playlist Uri when user click on play btn playlist

  const fetchPlaylistContent = async (e) => {
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    handleLoader();
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    setNameB(name);
    const playlistContent = await spotifyApi.getPlaylist(id);
    setTracks(playlistContent.tracks.items);
    setBannerInfoPlaylist(playlistContent);
    const tracksq = playlistContent.tracks.items.map((res) => res.track);
    setPlaylistToPlay(tracksq);
  }; // Fetch the plyalist content when clickinng on playlist link

  const setBannerInfoPlaylist = (response) => {
    setNameB(response.name);
    setDescription(response.description);
    if (response.followers.total !== 0) {
      setFollowers(response.followers.total + "  Followers");
    } else setFollowers("");
  }; // Setting the banner info in relation with the playlist displayed

  const getAlbumTracks = async (e) => {
    handleLoader();
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    const albumsTracks = await spotifyApi.getAlbumTracks(id);
    setTracks(albumsTracks.items);
    setPlaylistToPlay(albumsTracks.items);
    setBannerInfoAlbum(name);
  }; // Getting the track of album when clicking on album link

  const setBannerInfoAlbum = (name) => {
    let savedAlbum = savedAlbums.find(
      (album) => album.album.name === name || album
    );
    setNameB(savedAlbum.album.name);
  }; // Set the banner  name of the album displayed

  const setBannerInfoGenre = (id) => {
    setNameB(id);
    setDescription(undefined);
    setFollowers(undefined);
  }; // Set the banner info fo genre  recomendation

  const setTrackShow = async (e) => {
    handleLoader();
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    let id = e.currentTarget.dataset.id;
    const track = await spotifyApi.getTrack(id);
    setTrackToShow(track);
    getArtistRelatedArtists(track.artists[0].id);
    getRecommendationsTrack(track.id);
  }; // Function to set the track of the show page

  const getArtistRelatedArtists = async (id) => {
    const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
    const sortedArtists = relatedArtists.artists.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setRelatedArtists(sortedArtists);
  }; // Get the artists related to artis in artist show page

  const fetchRecomendedGenres = async (id) => {
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: id,
      limit: 50,
    });
    return recommendations;
  }; // Get recommended track for a genre ID

  const getRecommendationsTrack = async (id) => {
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    setPlaylistToPlay(tracks.tracks);
  }; // Get recommendation tracks for a track

  const getRecommendationsTrackFromArtist = async (id) => {
    const tracks = await spotifyApi.getRecommendations({
      seed_artists: id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    setPlaylistToPlay(tracks.tracks);
  }; // get Recommendation tracks for a artist

  const setArtistShow = async (e) => {
    handleLoader();
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    const id = e.currentTarget.dataset.id;
    const artist = await spotifyApi.getArtist(id);
    setArtistToShow(artist);
    fetchArtistAlbums(id);
    getArtistTopTracks(id);
    getRecommendationsTrackFromArtist(id);
    getArtistRelatedArtists(id);
    isFollowingArtist(id);
  }; // Set artist to show on artist show page

  const settingAlbumToPlay = async (e) => {
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    const id = e.currentTarget.dataset.id;
    const album = await spotifyApi.getAlbum(id);
    setPlaylistToPlay(album.tracks.items);
    setTracks(album.tracks.items);
    setNameB(album.name);
    setDescription(album.artists[0].name);
    setFollowers(album.label);
  };

  const getSearch = async (e) => {
    e.preventDefault();
    handleLoader();
    const searchResults = await spotifyApi.search(input, [
      "artist",
      "playlist",
      "track",
    ]);
    setTracks(searchResults.tracks.items);
    setSearchResultArtist(searchResults.artists.items);
    setPlaylistSearchResult(searchResults.playlists.items);
    setPlaylistToPlay(searchResults.tracks.items);
    setInput("");
  }; // Fetch from search input

  const setTrackToPlay = async (e) => {
    let uri = e.currentTarget.dataset.uri;
    let id = e.currentTarget.dataset.id;
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: id,
      limit: 100,
    });
    const uris = tracks.tracks.map((track) => track.uri);
    const urisToPlay = [uri, ...uris];
    setUri(urisToPlay);
  }; // Seting track to play when clicking on play

  const handleLoader = () => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }; // Setting the loader when fetching and then disable it

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }; // change milliseconde to second

  const isFollowingArtist = async (id) => {
    const isFollow = await spotifyApi.isFollowingArtists([id]);
    if (isFollow[0] === true) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }; // Check if the artist display in artist show page is followed by user

  const addToQueu = (e) => {
    const uri = e.currentTarget.dataset.uri;
    spotifyApi.queue(uri);
  }; // Adding track to queue

  const scrollTop = () => {
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
  };

  return (
    <Provider
      value={{
        spotifyApi,
        settingFollowedArtists,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        trackCurrentlyPlayed,
        scrollbar,
        getUserPlaylists,
        setBannerInfoGenre,
        fetchRecomendedGenres,
        setInput,
        scrollTop,
        handleLoader,
        topTracks,
        setIsFollowing,
        setTracks,
        setPlaylistToPlay,
        setNameB,
        setDescription,
        setFollowers,
        addToQueu,
        newReleases,
        settingAlbumToPlay,
        artistAlbums,
        followedArtists,
        isFollowingArtist,
        isFollowing,
        savedTracks,
        playlistSearchResult,
        showSearch,
        setShowSearch,
        setPlaylistUri,
        playlistToPlay,
        deviceId,
        uri,
        setUri,
        setTrackToPlay,
        firstLoad,
        isLoading,
        searchResultArtist,
        getSearch,
        input,
        artistTopTracks,
        artistToShow,
        setArtistShow,
        recomendedTracks,
        relatedArtists,
        millisToMinutesAndSeconds,
        trackToShow,
        setTrackShow,
        followers,
        description,
        nameB,
        getAlbumTracks,
        fetchPlaylistContent,
        categories,
        featuredPlaylists,
        topArtists,
        savedAlbums,
        playlists,
        user,
        currentPlayback,
        tracks,
      }}>
      {props.children}
    </Provider>
  );
};
