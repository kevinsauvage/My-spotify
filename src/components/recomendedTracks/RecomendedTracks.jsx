import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import PlayBtn from "../playBtn/PlayBtn";

const RecomendedTracks = ({ data }) => {
  const { millisToMinutesAndSeconds, setPlaylistUri } = useContext(AppContext);

  return (
    <>
      <h1 className="artist-show__recomended__title title">
        Recomended Tracks
      </h1>
      <PlayBtn onClick={setPlaylistUri} />
      <div className="section-header">
        <BibliothequeItemHeader name artist duration play queu />
      </div>
      {data &&
        data.map((track) => {
          return (
            <BibliothequeItem
              key={track.id}
              name={track.name}
              id={track.id}
              artist={track.artists[0].name}
              duration={millisToMinutesAndSeconds(track.duration_ms)}
              artistId={track.artists[0].id}
              uri={track.track ? track.track.uri : track.uri}
              play
            />
          );
        })}
    </>
  );
};

export default RecomendedTracks;
