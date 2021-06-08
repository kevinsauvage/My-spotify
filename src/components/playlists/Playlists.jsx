import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeItemLoader from "../bibliothequeItemLoader/BibliothequeItemLoader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";
import "./Playlist.scss";

const Playlists = ({ data }) => {
  const array = Array.from(Array(50).keys()); // Make an array to display 8 card loader carussel

  return (
    <div className="playlists">
      <BibliothequeTitle title="Playlist" />
      <BibliothequeItemHeader name owner />
      {data
        ? data.map((playlist) => {
            return (
              <BibliothequeItem
                key={playlist.id}
                playlistName={playlist.name && playlist.name}
                owner={playlist.owner && playlist.owner.display_name}
                playlistId={playlist.id}
              />
            );
          })
        : array.map((item) => <BibliothequeItemLoader key={item} />)}
    </div>
  );
};

export default Playlists;
