import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";
import "./Tracks.scss";

const Tracks = ({ data, title }) => {
  const { millisToMinutesAndSeconds } = useContext(AppContext);

  return (
    <div className="tracks">
      <BibliothequeTitle title={title} />
      <BibliothequeItemHeader name artist duration queu play />
      {data &&
        data.map((track) => {
          return (
            <BibliothequeItem
              key={track.id + Math.random(1000)}
              name={track.name}
              id={track.id}
              artistId={track.artists[0].id}
              artist={track.artists[0].name}
              duration={millisToMinutesAndSeconds(track.duration_ms)}
              uri={track.track ? track.track.uri : track.uri}
              play
            />
          );
        })}
    </div>
  );
};

export default Tracks;
