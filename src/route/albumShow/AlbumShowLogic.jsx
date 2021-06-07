import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";

const AlbumShowLogic = (id) => {
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();

  const { scrollbar, spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const settingAlbum = async () => {
      scrollTop(scrollbar);
      const album = await spotifyApi.getAlbum(id);
      setTracks(album.tracks.items);
      setAlbum(album);
    };
    settingAlbum();
  }, [spotifyApi, id, setTracks, setAlbum, scrollbar]);

  return { setUri, album, tracks };
};

export default AlbumShowLogic;
