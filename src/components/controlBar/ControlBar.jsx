import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "rc-slider/assets/index.css";
import "./ControlBar.scss";
import SpotifyPlayer from "react-spotify-web-playback";

const ControlBar = () => {
  const props = useContext(AppContext);
  return (
    <div className="controlBar">
      {props.token && props.uri !== "" && (
        <SpotifyPlayer
          showSaveIcon={true}
          deviceId={props.deviceId !== "" ? props.deviceId : null}
          uris={props.uri}
          token={props.token}
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
