import { createContext, useState, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Cookies from "js-cookie";
import Scrollbar from "smooth-scrollbar";

export const AppContext = createContext();
const { Provider } = AppContext;
const spotifyApi = new SpotifyWebApi();

export const AppProvider = (props) => {
  const token =
    window.location.hash.split("=")[1] || Cookies.get("spotifyAuthToken");
  spotifyApi.setAccessToken(token);
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
  const [input, setInput] = useState(""); // input search
  const [isLoading, setIsLoading] = useState(true); // spinner loader on each page
  const [uri, setUri] = useState(); // uri of track to play
  const [deviceId, setDeviceId] = useState(); // id of user device if the user is playing something
  const [playlistToPlay, setPlaylistToPlay] = useState(); // array of the playlist to start if push play btn
  const [isFollowing, setIsFollowing] = useState(false);
  const [followedArtists, setFollowedArtists] = useState(); // get user followed artist
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const [searchResults, setSearchResults] = useState(null);
  const [newReleases, setNewReleases] = useState();
  const [scrollbar, setScrollbar] = useState();
  const [playlistShowed, setPlaylistsShowed] = useState();
  const [albumShowed, setAlbumShowed] = useState();

  useEffect(() => {
    const scrollbar = Scrollbar.init(document.querySelector("#my-scrollbar"), {
      damping: 0.1,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
    setScrollbar(scrollbar);
  }, []);

  const getNewReleases = async () => {
    const response = await spotifyApi.getNewReleases({ limit: 50 });
    setNewReleases(response.albums.items);
  };

  const getTopTracks = useCallback(async () => {
    const response = await spotifyApi.getMyTopTracks({ limit: 50 });
    const topTracks = response.items;
    setTopTracks(topTracks); // Seting top tracks of user
    setNameB("Top Tracks"); // Setting the name to display
    initialSetting(topTracks); // Calling initial setting with the data receive
    const uris = topTracks.map((track) => track.uri);
    if (!uri) setUri(uris); // Setting the uris to play after first render only if no track is actually playing in any of user device
  }, []); // Getting top tracks, only run once

  useEffect(() => {
    getTopTracks();
    getMe();
    getNewReleases();
    getUserPlaylists();
    getTopArtist();
    getSavedAlbums();
    settingFollowedArtists();
    getNowPlaying();
  }, [getTopTracks]);

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
    const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
    const albums = response.items.map((item) => item.album);
    setSavedAlbums(albums);
  }; // Fetching the Albums saved by the user

  const settingFollowedArtists = async () => {
    const response = await spotifyApi.getFollowedArtists({ limit: 50 });
    setFollowedArtists(response.artists.items);
  }; // Fetch followed artist from user

  const initialSetting = async (data) => {
    const artistId = data[0].artists[0].id;
    setNameB("Top Tracks");
    setPlaylistToPlay(data); // Setting playlist to play with top track result
    setTrackToShow(data[0]); // setting the track to show with the best track of the top tracks - displayed in tracks show
    setTracks(data); // Setting the tracks to display in biblio with top tracks data to display in biblio
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
    scrollTop();
    handleSidebarMenu();
    const id = e.currentTarget.dataset.id;
    if (id === playlistShowed?.id) return;
    setIsLoading(true);
    const name = e.currentTarget.dataset.name;
    const playlistContent = await spotifyApi.getPlaylist(id);
    const tracks = playlistContent.tracks.items.map((res) => res.track);
    setPlaylistsShowed(playlistContent);
    setNameB(name);
    setBannerInfoPlaylist(playlistContent);
    setTracks(tracks);
    setPlaylistToPlay(tracks);
    setIsLoading(false);
  }; // Fetch the plyalist content when clickinng on playlist link

  const setBannerInfoPlaylist = (response) => {
    setNameB(response.name);
    setDescription(response.description);
    if (response.followers.total !== 0) {
      setFollowers(response.followers.total + "  Followers");
    } else setFollowers("");
  }; // Setting the banner info in relation with the playlist displayed

  const getAlbumTracks = async (e) => {
    scrollTop();
    handleSidebarMenu();
    const id = e.currentTarget.dataset.id;
    if (albumShowed === id) return;
    setIsLoading(true);
    const name = e.currentTarget.dataset.name;
    const albumsTracks = await spotifyApi.getAlbumTracks(id);
    setAlbumShowed(id);
    setTracks(albumsTracks.items);
    setPlaylistToPlay(albumsTracks.items);
    setNameB(name);
    setIsLoading(false);
  }; // Getting the track of album when clicking on album link

  const setTrackShow = async (e) => {
    scrollTop();
    let id = e.currentTarget.dataset.id;
    if (id === trackToShow.id) return;
    setIsLoading(true);
    handleSidebarMenu();
    const track = await spotifyApi.getTrack(id);
    setTrackToShow(track);
  }; // Function to set the track of the show page

  const setArtistShow = async (e) => {
    scrollTop();
    const id = e.currentTarget.dataset.id;
    if (id === artistToShow.id) return;
    setIsLoading(true);
    handleSidebarMenu();
    const artist = await spotifyApi.getArtist(id);
    setArtistToShow(artist);
  }; // Set artist to show on artist show page

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

  const handleSidebarMenu = () => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(false);
  }; // Setting the loader when fetching and then disable it

  const settingAlbumToPlay = async (e) => {
    scrollTop();
    setIsLoading(true);
    const id = e.currentTarget.dataset.id;
    const album = await spotifyApi.getAlbum(id);
    setPlaylistToPlay(album.tracks.items);
    setTracks(album.tracks.items);
    setNameB(album.name);
    setDescription(album.artists[0].name);
    setFollowers(album.label);
    setIsLoading(false);
  };

  const addToQueu = (e) => {
    const uri = e.currentTarget.dataset.uri;
    spotifyApi.queue(uri);
  }; // Adding track to queue

  const scrollTop = () => {
    scrollbar.setPosition(0, 0);
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
        handleSidebarMenu,
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
        newReleases,
        playlistToPlay,
        deviceId,
        uri,
        setSearchResults,
        setUri,
        setTrackToPlay,
        isLoading,
        input,
        artistToShow,
        settingAlbumToPlay,
        setArtistShow,
        trackToShow,
        setTrackShow,
        followers,
        setIsLoading,
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
