import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const ArtistShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const {
    spotifyApi,
    setUri,
    checkIfAlbumsAreFollowed,
    checkIfTrackIsSaved,
    savedAlbums,
  } = useContext(AppContext);

  const [artistAlbums, setArtistAlbums] = useState();
  const [artistTopTracks, setArtistTopTracks] = useState(undefined); // array of artist top tracks
  const [artist, setArtist] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [bg, setBg] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const setArtistShow = async () => {
      try {
        const artist = await spotifyApi.getArtist(id);
        setArtist(artist);
        setBg("url(" + artist.images[1].url + ")");
      } catch (error) {
        setError(true);
      }
    }; // Set artist to show on artist show page
    setArtistShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      const artistAlbums = await spotifyApi.getArtistAlbums(id);
      const unique = artistAlbums.items.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === thing.place && t.name === thing.name
          )
      );
      const sorted = unique.sort((a, b) => a.release_date > b.release_date);
      const albumsWithFollow = await checkIfAlbumsAreFollowed(sorted);
      setArtistAlbums(albumsWithFollow);
    };
    fetchArtistAlbums();
  }, [id, spotifyApi, checkIfAlbumsAreFollowed, savedAlbums]);

  useEffect(() => {
    const getArtistTopTracks = async () => {
      const topTracks = await spotifyApi.getArtistTopTracks(id, "FR");
      const tracksWithFollow = await checkIfTrackIsSaved(topTracks.tracks);
      setArtistTopTracks(tracksWithFollow);
    };
    getArtistTopTracks();
  }, [spotifyApi, id, checkIfTrackIsSaved]); // get artist top tracks

  const isFollowingArtist = useCallback(async () => {
    const isFollow = await spotifyApi.isFollowingArtists([id]);
    if (isFollow[0] === true) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [id, spotifyApi]);

  useEffect(() => {
    isFollowingArtist();
  }, [isFollowingArtist, id]); // Check if the artist display in artist show page is followed by user

  const handleFollow = async () => {
    if (isFollowing) {
      spotifyApi.unfollowArtists([id]);
      setTimeout(() => {
        isFollowingArtist();
      }, 500); // fetch artist followed by user after user unfollow a new artist
    } else {
      spotifyApi.followArtists([id]);
      setTimeout(() => {
        isFollowingArtist();
      }, 500); // fetch artist followed by user after user follow a new artist
    }
  }; // Following || unfollowing artist

  console.log(artistTopTracks);
  const setUriFromArtistTopTracks = () => {
    const tracksq = artistTopTracks.map((res) => res.item.uri);

    setUri(tracksq);
  }; // fetch uris and set uris to play when user click on artist top track play button

  return {
    artistAlbums,
    setUriFromArtistTopTracks,
    handleFollow,
    artistTopTracks,
    artist,
    bg,
    isFollowing,
    error,
  };
};

export default ArtistShowLogic;
