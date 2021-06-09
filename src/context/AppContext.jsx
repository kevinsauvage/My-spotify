import { createContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Cookies from "js-cookie";

export const AppContext = createContext();
const { Provider } = AppContext;
const spotifyApi = new SpotifyWebApi();

export const AppProvider = (props) => {
  const [uri, setUri] = useState(); // uri of track to play
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const token =
    window.location.hash.split("=")[1] || Cookies.get("spotifyAuthToken");
  spotifyApi.setAccessToken(token);

  const handleSidebarMenu = () => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(false);
  }; // Setting the loader when fetching and then disable it

  return (
    <Provider
      value={{
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        handleSidebarMenu,
        uri,
        setUri,
      }}>
      {props.children}
    </Provider>
  );
};
