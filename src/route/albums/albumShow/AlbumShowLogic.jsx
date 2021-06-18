import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const AlbumShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri, checkIfTrackIsSaved } = useContext(AppContext);

  useEffect(() => {
    const settingAlbum = async () => {
      try {
        const album = await spotifyApi.getAlbum(id);
        const tracksWithFollow = await checkIfTrackIsSaved(album.tracks.items);
        setTracks(tracksWithFollow);
        setAlbum(album);
      } catch (error) {
        setError(true);
      }
    };
    settingAlbum();
  }, [spotifyApi, id, setTracks, setAlbum, checkIfTrackIsSaved]);

  const bg = "url(" + album?.images[0].url + ")";

  return { setUri, album, tracks, error, bg };
};

export default AlbumShowLogic;
