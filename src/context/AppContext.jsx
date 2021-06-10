import { createContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export const AppContext = createContext();
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [uri, setUri] = useState(); // uri of track to play
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu

  window.location.hash !== "" &&
    spotifyApi.setAccessToken(window.location.hash.split("=")[1]);

  return (
    <Provider
      value={{
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        uri,
        setUri,
      }}>
      {props.children}
    </Provider>
  );
};
