import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";

const Tracks = ({ data, title }) => {
  return (
    <div className="tracks padding">
      <BibliothequeTitle title={title} />
      <BibliothequeItemHeader name artist duration queu play />
      {data &&
        data.map((track) => {
          return (
            <BibliothequeItem
              key={track.id}
              name={track.name}
              trackId={track.id}
              artistId={track.artists?.[0].id}
              artist={track.artists?.[0].name}
              duration={track.duration_ms}
              uri={track.track?.uri || track.uri}
              play
            />
          );
        })}
    </div>
  );
};

export default Tracks;
