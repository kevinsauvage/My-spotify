import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";
import "./Artists.scss";

const Artists = ({ data }) => {
  return (
    <div className="artists">
      <BibliothequeTitle title="Related Artists" />
      <BibliothequeItemHeader artist popularity />
      {data &&
        data.map((artist) => {
          return (
            <BibliothequeItem
              key={artist.id}
              artist={artist.name}
              popularity={artist.popularity}
              artistId={artist.id}
            />
          );
        })}
    </div>
  );
};

export default Artists;
