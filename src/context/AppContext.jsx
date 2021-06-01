import { createContext, useState, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Scrollbar from "smooth-scrollbar";
import Cookies from "js-cookie";

export const AppContext = createContext();
const { Provider } = AppContext;
const spotifyApi = new SpotifyWebApi();
const token = Cookies.get("spotifyAuthToken");
spotifyApi.setAccessToken(token);

export const AppProvider = (props) => {
  const [user, setUser] = useState(); // user info
  const [playlists, setPlaylists] = useState([]); // user Playlist
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [topArtists, setTopArtists] = useState([]); // user top artists
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums
  const [currentPlayback, setCurrentPlayback] = useState([]); //user current playback
  const [tracks, setTracks] = useState([]); // tracks to display in biblio
  const [nameB, setNameB] = useState(""); // info to display in banner biblio
  const [description, setDescription] = useState(""); // description to display in header biblio
  const [followers, setFollowers] = useState(""); // follower to display in biblio
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page
  const [artistToShow, setArtistToShow] = useState(undefined); // Set artist to display on the show page
  const [scrollbar, setScrollbar] = useState(); // storing scrollbar - scroll to top function
  const [input, setInput] = useState(""); // input search
  const [isLoading, setIsLoading] = useState(false); // spinner loader on each page
  const [firstLoad, setFirstLoad] = useState(true); // display spinner loader for first render
  const [uri, setUri] = useState(); // uri of track to play
  const [deviceId, setDeviceId] = useState(); // id of user device if the user is playing something
  const [playlistToPlay, setPlaylistToPlay] = useState(); // array of the playlist to start if push play btn
  const [isFollowing, setIsFollowing] = useState(false);
  const [followedArtists, setFollowedArtists] = useState(); // get user followed artist
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const [searchResults, setSearchResults] = useState(null);

  const getTopTracks = useCallback(async () => {
    const topTracks = await spotifyApi.getMyTopTracks({ limit: 50 });
    setTopTracks(topTracks.items); // Seting top tracks of user
    setNameB("Top Tracks"); // Setting the name to display
    initialSetting(topTracks); // Calling initial setting with the data receive
    const uris = topTracks.items.map((track) => track.uri);
    if (!uri) setUri(uris); // Setting the uris to play after first render only if no track is actually playing in any of user device
  }, []); // Getting top tracks, only run once

  useEffect(() => {
    setScrollbar(Scrollbar.get(document.querySelector("#my-scrollbar")));
    getTopTracks();
    getMe();
    getUserPlaylists();
    getTopArtist();
    getSavedAlbums();
    settingFollowedArtists();
    getNowPlaying();
    disableFirstLoader();
  }, [getTopTracks]);

  const disableFirstLoader = () => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 4000);
  }; // Disable first loader after 4 secondes

  // Fetching user info -----------------------------------------------------------------------------------------Fetching user info-----------

  const getMe = async () => {
    const user = await spotifyApi.getMe();
    setUser(user);
  }; // Getting user profil

  const getUserPlaylists = async () => {
    const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
    setPlaylists(userPlaylist.items);
  }; // Getting user playlist

  const getNowPlaying = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    if (response) {
      setCurrentPlayback(response);
      setUri(response.item.uri); // If something is playing in one of the user device, it will fetch the track and play it
      setDeviceId(response.device.id); // Set the device for the control bar player
    }
  }; // Fetching now playing,

  const getTopArtist = async () => {
    const topArtist = await spotifyApi.getMyTopArtists();
    setTopArtists(topArtist.items);
  }; // Fetching the top artist of the user

  const getSavedAlbums = async () => {
    const albums = await spotifyApi.getMySavedAlbums({ limit: 50 });
    setSavedAlbums(albums.items);
  }; // Fetching the Albums saved by the user

  const settingFollowedArtists = async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  }; // Fetch followed artist from user

  const initialSetting = async (data) => {
    const artistId = data.items[0].artists[0].id;
    setNameB("Top Tracks");
    setPlaylistToPlay(data.items); // Setting playlist to play with top track result
    setTrackToShow(data.items[0]); // setting the track to show with the best track of the top tracks - displayed in tracks show
    setTracks(data.items); // Setting the tracks to display in biblio with top tracks data to display in biblio
    const artistToShow = await spotifyApi.getArtist(artistId);
    setArtistToShow(artistToShow); // Fetching the artist corresponding to best track of top tracks
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

  const setTrackShow = async (e) => {
    handleLoader();
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    let id = e.currentTarget.dataset.id;
    const track = await spotifyApi.getTrack(id);
    setTrackToShow(track);
  }; // Function to set the track of the show page

  const setArtistShow = async (e) => {
    handleLoader();
    if (scrollbar) {
      scrollbar.scrollTop = 0;
    }
    const id = e.currentTarget.dataset.id;
    const artist = await spotifyApi.getArtist(id);
    setArtistToShow(artist);
  }; // Set artist to show on artist show page

  const getSearch = async (e) => {
    e.preventDefault();
    handleLoader();
    const searchResults = await spotifyApi.search(input, [
      "artist",
      "playlist",
      "track",
    ]);
    setSearchResults(searchResults);
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
        token,
        spotifyApi,
        settingFollowedArtists,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        getUserPlaylists,
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
        followedArtists,
        isFollowing,
        setPlaylistUri,
        searchResults,
        playlistToPlay,
        deviceId,
        uri,
        setUri,
        setTrackToPlay,
        firstLoad,
        isLoading,
        getSearch,
        input,
        artistToShow,
        setArtistShow,
        millisToMinutesAndSeconds,
        trackToShow,
        setTrackShow,
        followers,
        description,
        nameB,
        getAlbumTracks,
        fetchPlaylistContent,
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
