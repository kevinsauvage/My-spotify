import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const AlbumShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);
  const [isFollowed, setIsFollowed] = useState();

  const { spotifyApi, setUri, checkIfTrackIsSaved, unSaveAlbum, saveAlbum } =
    useContext(AppContext);

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

  const checkIfFollowed = useCallback(async () => {
    const response = await spotifyApi.containsMySavedAlbums([id]);
    setIsFollowed(response[0]);
  }, [spotifyApi, id]);

  useEffect(() => {
    album && checkIfFollowed();
  }, [checkIfFollowed, album]);

  const handleFollow = () => {
    if (isFollowed) {
      unSaveAlbum(id);
      setTimeout(() => {
        checkIfFollowed();
      }, 400);
    } else {
      saveAlbum(id);
      setTimeout(() => {
        checkIfFollowed();
      }, 400);
    }
  };

  const bg = "url(" + album?.images[0].url + ")";

  return { setUri, album, tracks, error, bg, isFollowed, handleFollow };
};

export default AlbumShowLogic;
