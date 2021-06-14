import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import "./Albums.scss";

const ArtistAlbums = ({ data }) => {
  return (
    <div className="albums">
      <BibliothequeItemHeader album year />
      {data &&
        data?.map((album, i) => {
          return (
            <BibliothequeItem
              key={album.album.name}
              albumName={album.album.name}
              year={album.album.release_date.split("-")[0]}
              albumId={album.album.id}
              followedAlbum={album.follow}
            />
          );
        })}
    </div>
  );
};

export default ArtistAlbums;
