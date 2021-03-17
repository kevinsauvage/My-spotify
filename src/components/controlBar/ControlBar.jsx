import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "rc-slider/assets/index.css";
import "./ControlBar.scss";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";

const ControlBar = () => {
  const props = useContext(AppContext);
  let tokenSaved = Cookies.get("spotifyAuthToken");
  return (
    <div className="controlBar">
      {tokenSaved && props.uri !== "" && (
        <SpotifyPlayer
          showSaveIcon={true}
          deviceId={props.deviceId !== "" ? props.deviceId : null}
          uris={props.uri}
          token={tokenSaved}
          syncExternalDevice={true}
          play={props.play}
          styles={{
            activeColor: "#21d5fda1",
            sliderHandleColor: "#21d5fda1",
          }}
        />
      )}
    </div>
  );
};

export default ControlBar;
