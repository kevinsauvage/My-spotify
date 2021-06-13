import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import "./Albums.scss";

const ArtistAlbums = ({ data }) => {
  return (
    <div className="albums">
      <BibliothequeItemHeader album year />
      {data &&
        data.map((album, i) => {
          return (
            <BibliothequeItem
              key={i}
              albumName={album.name}
              year={album.release_date.split("-")[0]}
              albumId={album.id}
            />
          );
        })}
    </div>
  );
};

export default ArtistAlbums;
