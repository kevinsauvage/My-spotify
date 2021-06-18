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
              key={album?.item?.name}
              albumName={album?.item?.name}
              year={album?.item?.release_date?.split("-")[0]}
              albumId={album?.item?.id}
              followedAlbum={album?.follow}
            />
          );
        })}
    </div>
  );
};

export default ArtistAlbums;
