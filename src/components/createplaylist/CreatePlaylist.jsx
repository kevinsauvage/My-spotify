import { useContext, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import "./CreatePlaylist.scss";

const CreatePlaylist = ({ setDisplayCreatePlaylist }) => {
  const [value, setValue] = useState({ name: "", description: "" });
  const { spotifyApi, user, getUserPlaylists } = useContext(AppContext);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    spotifyApi.createPlaylist(user.id, value);
    setValue({ name: "", description: "" });
    setTimeout(() => {
      getUserPlaylists();
    }, 300);
    setDisplayCreatePlaylist(false);
  };

  return (
    <form className="create-playlist" action="submit" onSubmit={handleSubmit}>
      <h2 className="create-playlist__title">Add a new playlist</h2>
      <div className="create-playlist__close">
        <RiCloseCircleFill
          size={20}
          onClick={() => setDisplayCreatePlaylist(false)}
        />
      </div>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={value.name}
        onChange={handleChange}
        placeholder="Playlist name"
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={value.description}
        placeholder="Playlist description"
      />
      <button
        type="submit"
        className="create-playlist__create-btn"
        onClick={() => null}>
        <h2>Create playlist</h2>
        <MdAddCircleOutline size={20} color="white" />
      </button>
    </form>
  );
};

export default CreatePlaylist;
