import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const ArtistShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const {
    spotifyApi,
    setUri,
    setFollowedArtists,
    checkIfAlbumsAreFollowed,
    checkIfTrackIsSaved,
    savedAlbums,
    checkIfArtistsAreFollowed,
  } = useContext(AppContext);

  const [artistAlbums, setArtistAlbums] = useState();
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
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
    setArtistShow(id);
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
    const getRecommendedTrackFromArtist = async () => {
      const tracks = await spotifyApi.getRecommendations({
        seed_artists: id,
        limit: 50,
      });
      const tracksWithFollow = await checkIfTrackIsSaved(tracks.tracks);
      setRecomendedTracks(tracksWithFollow);
    };
    getRecommendedTrackFromArtist();
  }, [id, spotifyApi, checkIfTrackIsSaved]); // get Recommendation tracks for a artist

  useEffect(() => {
    const getArtistRelatedArtists = async () => {
      const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
      const sortedArtists = relatedArtists.artists.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      const sortedArtistsWithFollow = await checkIfArtistsAreFollowed(
        sortedArtists
      );
      setRelatedArtists(sortedArtistsWithFollow);
    };
    getArtistRelatedArtists();
  }, [spotifyApi, id, checkIfArtistsAreFollowed]); // Get the artists related to artis in artist show page

  useEffect(() => {
    const getArtistTopTracks = async () => {
      const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", 100);
      const tracksWithFollow = await checkIfTrackIsSaved(topTracks.tracks);

      setArtistTopTracks(tracksWithFollow);
    };
    getArtistTopTracks();
  }, [spotifyApi, id, checkIfTrackIsSaved]); // get artist top tracks

  useEffect(() => {
    const isFollowingArtist = async () => {
      const isFollow = await spotifyApi.isFollowingArtists([id]);
      if (isFollow[0] === true) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    };
    isFollowingArtist();
  }, [spotifyApi, setIsFollowing, id]); // Check if the artist display in artist show page is followed by user

  const handleFollow = async () => {
    if (isFollowing) {
      spotifyApi.unfollowArtists([id]);
      setIsFollowing(false);
      setTimeout(() => {
        setFollowedArtists();
      }, 500); // fetch artist followed by user after user unfollow a new artist
    } else {
      spotifyApi.followArtists([id]);
      setIsFollowing(true);
      setTimeout(() => {
        setFollowedArtists();
      }, 500); // fetch artist followed by user after user follow a new artist
    }
  }; // Following || unfollowing artist

  const setUriFromArtistTopTracks = () => {
    const tracksq = artistTopTracks.map((res) => res.uri);
    setUri(tracksq);
  }; // fetch uris and set uris to play when user click on artist top track play button

  const setUriFromArtistRecomendedTracks = () => {
    const uris = recomendedTracks.map((track) => track.uri);
    setUri(uris);
  };

  return {
    artistAlbums,
    setUriFromArtistTopTracks,
    setUriFromArtistRecomendedTracks,
    handleFollow,
    relatedArtists,
    artistTopTracks,
    artist,
    recomendedTracks,
    bg,
    isFollowing,
    error,
  };
};

export default ArtistShowLogic;
