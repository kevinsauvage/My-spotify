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
  const [savedTracks, setSavedTracks] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followedArtists, setFollowedArtists] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [newReleases, setNewReleases] = useState();

  useEffect(() => {
    setScrollbar(Scrollbar.get(document.querySelector("#my-scrollbar")));
    initialFetch();
  }, []);

  const disableFirstLoader = () => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 4000);
  };

  const initialFetch = () => {
    getNowPlaying();
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
  };

  // Fetching user info -----------------------------------------------------------------------------------------Fetching user info-----------

  // Getting user profil
  const getMe = async () => {
    const user = await spotifyApi.getMe();
    setUser(user);
  };

  // Getting user playlist
  const getUserPlaylists = async () => {
    const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
    setPlaylists(userPlaylist.items);
  };

  // Fetching Categorys
  const getCategories = async () => {
    const categories = await spotifyApi.getCategories({ limit: 50 });
    setCategories(categories.categories.items);
  };

  // Fetching featured playlist
  const getFeaturedPlaylist = () => {
    spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((data) => {
      setFeaturedPlaylists(data.playlists.items);
    });
  };

  // Fetching now playing,
  const getNowPlaying = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    // Only if response is true we set the track to play
    if (response) {
      setCurrentPlayback(response);
      setUri(response.item.uri); // If something is playing in one of the user device, it will fetch the track and play it
      setDeviceId(response.device.id); // Set the device for the control bar player
    }
  };

  // Getting top tracks, only run once
  const getTopTracks = async () => {
    const topTracks = await spotifyApi.getMyTopTracks({ limit: 50 });
    setTopTracks(topTracks.items); // Seting top tracks of user
    setNameB("Top Tracks"); // Setting the name to display
    initialSetting(topTracks); // Calling initial setting with the data receive
    const uris = topTracks.items.map((track) => track.uri);
    setUri(uris); // Setting the uris to play every tracks
  };

  // Fetching the top artist of the user
  const getTopArtist = async () => {
    const topArtist = await spotifyApi.getMyTopArtists();
    setTopArtists(topArtist.items);
  };

  // Fetching the Albums saved by the user
  const getSavedAlbums = async () => {
    const albums = await spotifyApi.getMySavedAlbums({ limit: 50 });
    setSavedAlbums(albums.items);
  };

  const fetchRecentlyPlayed = async () => {
    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      type: "track",
      limit: 50,
    });
    return recentlyPlayed;
  };

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

  // get artist top tracks
  const getArtistTopTracks = async (id) => {
    const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", 100);
    setArtistTopTracks(topTracks.tracks);
  };

  const getNewReleases = async () => {
    const response = await spotifyApi.getNewReleases({ limit: 50 });
    setNewReleases(response.albums.items);
  };

  // Fetch followed artist from user
  const settingFollowedArtists = async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  };

  // Setting what to display in every page at first render
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
  };
  // General function -----------------------------------------------------------------------------------------------General function

  // Seting playlist Uri when user click on play btn playlist
  const setPlaylistUri = () => {
    if (playlistToPlay.lenght === 1) {
      setUri(playlistToPlay);
    } else {
      const uris = playlistToPlay.map((track) => track.uri);
      setUri(uris);
    }
  };

  // Fetch the plyalist content when clickinng on playlist link
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
  };

  // Setting the banner info in relation with the playlist displayed
  const setBannerInfoPlaylist = (response) => {
    setNameB(response.name);
    setDescription(response.description);
    if (response.followers.total !== 0) {
      setFollowers(response.followers.total + "  Followers");
    } else setFollowers("");
  };

  // Getting the track of album when clicking on album link
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
  };

  // Set the banner  name of the album displayed
  const setBannerInfoAlbum = (name) => {
    let savedAlbum = savedAlbums.find(
      (album) => album.album.name === name || album
    );
    setNameB(savedAlbum.album.name);
  };

  // Set the banner info fo genre  recomendation
  const setBannerInfoGenre = (id) => {
    setNameB(id);
    setDescription(undefined);
    setFollowers(undefined);
  };

  // Function to set the track of the show page
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
  };

  // Get the artists related to artis in artist show page
  const getArtistRelatedArtists = async (id) => {
    const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
    const sortedArtists = relatedArtists.artists.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setRelatedArtists(sortedArtists);
  };

  // Get recommended track for a genre ID
  const fetchRecomendedGenres = async (id) => {
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: id,
      limit: 50,
    });
    return recommendations;
  };

  // Get recommendation tracks for a track
  const getRecommendationsTrack = async (id) => {
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    setPlaylistToPlay(tracks.tracks);
  };

  // get Recommendation tracks for a artist
  const getRecommendationsTrackFromArtist = async (id) => {
    const tracks = await spotifyApi.getRecommendations({
      seed_artists: id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    setPlaylistToPlay(tracks.tracks);
  };

  // Set artist to show on artist show page
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
  };

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

  // Fetch from search input
  const getSearch = async (e) => {
    e.preventDefault();
    handleLoader();
    const searchResults = await spotifyApi.search(input, [
      "artist",
      "playlist",
      "track",
    ]);
    setTracks(searchResults.tracks.items);
    console.log(searchResults.tracks.items[0].album.artists[0].name);
    console.log(searchResults.tracks.items);
    setSearchResultArtist(searchResults.artists.items);
    setPlaylistSearchResult(searchResults.playlists.items);
    setPlaylistToPlay(searchResults.tracks.items);
    setInput("");
  };

  // Seting track to play when clicking on play
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
  };

  // Setting the loader when fetching and then disable it
  const handleLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const setUriFromArtistTopTracks = () => {
    const tracksq = artistTopTracks.map((res) => {
      return res.uri;
    });
    setUri(tracksq);
  };

  // change milliseconde to second
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  // Following || unfollowing artist
  const handleFollow = async () => {
    if (isFollowing) {
      spotifyApi.unfollowArtists([artistToShow.id]);
      setIsFollowing(false);
      settingFollowedArtists();
    } else {
      spotifyApi.followArtists([artistToShow.id]);
      setIsFollowing(true);
      settingFollowedArtists();
    }
  };

  // Check if the artist display in artist show page is followed by user
  const isFollowingArtist = async (id) => {
    const isFollow = await spotifyApi.isFollowingArtists([id]);
    if (isFollow[0] === true) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  // Adding track to queue
  const addToQueu = (e) => {
    const uri = e.currentTarget.dataset.uri;
    spotifyApi.queue(uri);
  };

  const scrollTop = () => {
    if (props.scrollbar) {
      scrollbar.scrollTop = 0;
    }
  };

  const addTrackToPlaylist = async (playlistId, uri) => {
    const response = await spotifyApi.addTracksToPlaylist(playlistId, [uri]);
    console.log(response);
  };

  return (
    <Provider
      value={{
        scrollbar,
        addTrackToPlaylist,
        getUserPlaylists,
        setBannerInfoGenre,
        fetchRecomendedGenres,
        fetchRecentlyPlayed,
        setInput,
        scrollTop,
        handleLoader,
        topTracks,
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
        handleFollow,
        isFollowing,
        savedTracks,
        playlistSearchResult,
        showSearch,
        setShowSearch,
        setUriFromArtistTopTracks,
        setPlaylistUri,
        playlistToPlay,
        deviceId,
        uri,
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
