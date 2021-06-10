import "rc-slider/assets/index.css";
import "./ControlBar.scss";
import SpotifyPlayer from "react-spotify-web-playback";
import ControlBarLogic from "./ControlBarLogic";

const ControlBar = () => {
  const { deviceId, token, uri } = ControlBarLogic();

  return (
    <div className="controlBar">
      {token && uri !== "" && (
        <SpotifyPlayer
          showSaveIcon={true}
          deviceId={deviceId !== "" ? deviceId : null}
          uris={uri}
          token={token}
          syncExternalDevice={true}
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
