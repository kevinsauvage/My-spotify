import { createContext, useState, useEffect } from "react";
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

  const [uri, setUri] = useState(); // uri of track to play
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const [scrollbar, setScrollbar] = useState();
  const [followedArtists, setFollowedArtists] = useState(); // get user followed artist

  useEffect(() => {
    const scrollbar = Scrollbar.init(document.querySelector("#my-scrollbar"), {
      damping: 0.1,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
    setScrollbar(scrollbar);
  }, []);

  const handleSidebarMenu = () => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(false);
  }; // Setting the loader when fetching and then disable it

  return (
    <Provider
      value={{
        token,
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        handleSidebarMenu,
        scrollbar,
        uri,
        followedArtists,
        setFollowedArtists,
        setUri,
      }}>
      {props.children}
    </Provider>
  );
};
