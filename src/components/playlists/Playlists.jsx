import BibliothequeItem from "../bibliothequeItem/BibliothequeItem";
import BibliothequeItemHeader from "../bibliothequeItemHeader/BibliothequeItemHeader";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";
import "./Playlist.scss";

const Playlists = ({ data }) => {
  return (
    <div className="playlists">
      <BibliothequeTitle title="Playlist" />
      <BibliothequeItemHeader name owner play />
      {data &&
        data.map((playlist) => {
          return (
            <BibliothequeItem
              key={playlist.id}
              name={playlist.name && playlist.name}
              owner={playlist.owner && playlist.owner.display_name}
              playlistId={playlist.id}
              play
            />
          );
        })}
    </div>
  );
};

export default Playlists;
