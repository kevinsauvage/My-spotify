import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const AlbumShowLogic = (id) => {
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const settingAlbum = async () => {
      try {
        const album = await spotifyApi.getAlbum(id);
        setTracks(album.tracks.items);
        setAlbum(album);
      } catch (error) {
        setError(true);
      }
    };
    settingAlbum();
  }, [spotifyApi, id, setTracks, setAlbum]);

  return { setUri, album, tracks, error };
};

export default AlbumShowLogic;
