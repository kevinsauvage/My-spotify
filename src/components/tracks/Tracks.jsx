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
                name={track?.item?.name || track?.name}
                trackId={track?.item?.id || track?.id}
                artistId={track?.item?.artists?.[0]?.id || track?.item?.[0]?.id}
                artist={
                  track?.item?.artists?.[0]?.name || track?.item?.[0]?.name
                }
                duration={track?.item?.duration_ms || track?.duration_ms}
                uri={track?.item?.uri || track?.uri}
                play
                followed={track?.follow}
              />
            );
          })
        : array.map((item) => <BibliothequeItemLoader key={item} />)}
    </div>
  );
};

export default Tracks;
