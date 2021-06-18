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
        data.map((item, i) => {
          return (
            <BibliothequeItem
              key={i}
              artist={item.item.name}
              popularity={item.item.popularity}
              artistId={item.item.id}
              followed={item.follow}
            />
          );
        })}
    </div>
  );
};

export default Artists;
