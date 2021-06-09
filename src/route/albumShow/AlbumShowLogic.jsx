import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const AlbumShowLogic = (id) => {
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();

  const { spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const settingAlbum = async () => {
      const album = await spotifyApi.getAlbum(id);
      setTracks(album.tracks.items);
      setAlbum(album);
    };
    settingAlbum();
  }, [spotifyApi, id, setTracks, setAlbum]);

  return { setUri, album, tracks };
};

export default AlbumShowLogic;
