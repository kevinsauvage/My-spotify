import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const ControlBarLogic = () => {
  const [deviceId, setDeviceId] = useState();
  const { spotifyApi, setUri, uri } = useContext(AppContext);
  const location = useLocation();
  const [token, setToken] = useState();

  useEffect(() => {
    if (location.hash !== "") setToken(location.hash.split("=")[1]);
  }, [location]);

  useEffect(() => {
    const getNowPlaying = async () => {
      const response = await spotifyApi.getMyCurrentPlaybackState();
      if (response) {
        setUri(response.item.uri); // If something is playing in one of the user device, it will fetch the track and play it
        setDeviceId(response.device.id); // Set the device for the control bar player
      } else {
        const response = await spotifyApi.getMyTopTracks({ limit: 50 });
        const tracks = response.items;
        setUri(tracks?.[0]?.uri);
      }
    }; // Fetching now playing,
    getNowPlaying();
  }, [spotifyApi, setDeviceId, setUri]);

  return { deviceId, token, uri };
};

export default ControlBarLogic;
