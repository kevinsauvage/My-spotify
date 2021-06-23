import { useContext, useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./PlaylistsGenerator.scss";

const PlaylistsGenerator = () => {
  const history = useHistory();
  const { spotifyApi, user, getUserPlaylists, userPlaylists } =
    useContext(AppContext);
  const [showGeneratePlaylsitModal, setShowGeneratePlaylistModal] =
    useState(false);
  const [categories, setCategories] = useState([]);
  const [uris, setUris] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    genre: "",
    limit: 10,
    name: "",
    description: "",
  });

  useEffect(() => {
    spotifyApi.getAvailableGenreSeeds().then((response) => {
      setCategories(response.genres);
    });
  }, [spotifyApi]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    spotifyApi.createPlaylist(
      user.id,
      { name: value.name, description: value.description },
      getUserPlaylists
    );

    spotifyApi
      .getRecommendations({
        seed_genres: value.genre,
        limit: value.limit,
      })
      .then((response) => {
        console.log(response.tracks);
        const uris = response.tracks.map((track) => track.uri);
        setUris(uris);
      });
  };

  useEffect(() => {
    if (userPlaylists?.[0].item.name === value.name) {
      spotifyApi.addTracksToPlaylist(userPlaylists?.[0].item.id, uris);
      setValue({
        genre: "",
        limit: 10,
        name: "",
        description: "",
      });
      setIsLoading(false);
      history.push({
        pathname: `/Playlists/${userPlaylists?.[0].item.name}`,
        state: {
          id: userPlaylists?.[0].item.id,
        },
      });
      setShowGeneratePlaylistModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlaylists, uris, spotifyApi]);

  const limitArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="playlists-generator">
      <button
        className="playlists-generator__btn"
        onClick={() =>
          setShowGeneratePlaylistModal(!showGeneratePlaylsitModal)
        }>
        Generate playlist
      </button>
      {showGeneratePlaylsitModal && (
        <div className="generate-playlist-modal">
          <div className="generate-playlist-modal__close">
            <RiCloseCircleFill
              size={20}
              onClick={() => setShowGeneratePlaylistModal(false)}
            />
          </div>
          <h3 className="generate-playlist-modal__title">
            Playlists Generator
          </h3>
          {!isLoading ? (
            <form
              className="generate-playlist-modal__form"
              onSubmit={handleSubmit}>
              <label htmlFor="genre">Choose a genre</label>
              <select required onChange={handleChange} name="genre">
                <option></option>
                {categories.map((cat) => {
                  return <option key={cat}>{cat}</option>;
                })}
              </select>
              <label htmlFor="limit">Choose how many tracks you want</label>
              <select required name="limit" onChange={handleChange}>
                <option></option>
                {limitArray.map((num) => {
                  return <option key={num}>{num}</option>;
                })}
              </select>
              <label>Give it a name</label>
              <input
                autoComplete="off"
                onChange={handleChange}
                required
                type="text"
                name="name"
              />
              <label>
                Give it a description <small>{"(optional)"}</small>
              </label>
              <input
                autoComplete="off"
                onChange={handleChange}
                type="text"
                name="description"
              />
              <button className="generate-playlist-modal__btn" type="submit">
                Generate playlist
              </button>
            </form>
          ) : (
            <div className="generate-playlist-modal__loader">
              <h6>Please wait, we are finding the best tracks for you...</h6>
              <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistsGenerator;
