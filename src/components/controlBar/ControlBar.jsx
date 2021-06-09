import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "rc-slider/assets/index.css";
import "./ControlBar.scss";
import SpotifyPlayer from "react-spotify-web-playback";

const ControlBar = () => {
  const [deviceId, setDeviceId] = useState();
  const { spotifyApi, setUri, uri } = useContext(AppContext);

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

  return (
    <div className="controlBar">
      <SpotifyPlayer
        showSaveIcon={true}
        deviceId={deviceId !== "" ? deviceId : null}
        uris={uri}
        token={window.sessionStorage.getItem("token")}
        syncExternalDevice={true}
        styles={{
          activeColor: "#21d5fda1",
          sliderHandleColor: "#21d5fda1",
        }}
      />
    </div>
  );
};

export default ControlBar;
