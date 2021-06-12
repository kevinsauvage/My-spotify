import { createContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export const AppContext = createContext();
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [uri, setUri] = useState(); // uri of track to play
  const [sidebarLeftIsOpen, setSidebarLeftIsOpen] = useState(false); // Mobile menu
  const [sidebarRightIsOpen, setSidebarRightIsOpen] = useState(false); // Mobile menu
  const [followedArtists, setFollowedArtists] = useState();

  window.location.hash !== "" &&
    spotifyApi.setAccessToken(window.location.hash.split("=")[1]);

  useEffect(() => {
    const settingFollowedArtists = async () => {
      const response = await spotifyApi.getFollowedArtists({ limit: 50 });
      setFollowedArtists(response.artists.items);
    }; // Fetch followed artist from user
    settingFollowedArtists();
  }, [setFollowedArtists]);

  return (
    <Provider
      value={{
        spotifyApi,
        setSidebarRightIsOpen,
        setSidebarLeftIsOpen,
        followedArtists,
        setFollowedArtists,
        sidebarRightIsOpen,
        sidebarLeftIsOpen,
        uri,
        setUri,
      }}>
      {props.children}
    </Provider>
  );
};
