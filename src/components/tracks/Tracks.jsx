import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeItemLoader from "../bibliothequeItemLoader/BibliothequeItemLoader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";
import "./Tracks.scss";
const Tracks = ({ data, title }) => {
  const array = Array.from(Array(50).keys()); // Make an array to display 8 card loader carussel

  return (
    <div className="tracks">
      {title && <BibliothequeTitle title={title} />}
      <BibliothequeItemHeader name artist duration queu play />
      {data
        ? data.map((track, i) => {
            return (
              <BibliothequeItem
                key={i}
                name={track.name}
                trackId={track.id}
                artistId={track.artists?.[0].id}
                artist={track.artists?.[0].name}
                duration={track.duration_ms}
                uri={track.track?.uri || track.uri}
                play
              />
            );
          })
        : array.map((item) => <BibliothequeItemLoader key={item} />)}
    </div>
  );
};

export default Tracks;
