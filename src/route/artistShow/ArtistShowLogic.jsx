import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const ArtistShowLogic = () => {
  const {
    artistToShow,
    spotifyApi,
    setPlaylistToPlay,
    isFollowing,
    setIsFollowing,
    setUri,
    settingFollowedArtists,
  } = useContext(AppContext);

  const [artistAlbums, setArtistAlbums] = useState();
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [artistTopTracks, setArtistTopTracks] = useState(undefined); // array of artist top tracks

  const fetchArtistAlbums = useCallback(
    async (id) => {
      const artistAlbums = await spotifyApi.getArtistAlbums(id);
      const unique = artistAlbums.items.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === thing.place && t.name === thing.name
          )
      );
      const sorted = unique.sort((a, b) => {
        return a.release_date > b.release_date;
      });
      setArtistAlbums(sorted);
    },
    [spotifyApi]
  );

  const getRecommendationsTrackFromArtist = useCallback(
    async (id) => {
      const tracks = await spotifyApi.getRecommendations({
        seed_artists: artistToShow.id,
        limit: 50,
      });
      setRecomendedTracks(tracks.tracks);
      setPlaylistToPlay(tracks.tracks);
    },
    [artistToShow?.id, setPlaylistToPlay, spotifyApi]
  ); // get Recommendation tracks for a artist

  const getArtistRelatedArtists = useCallback(
    async (id) => {
      const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
      const sortedArtists = relatedArtists.artists.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      setRelatedArtists(sortedArtists);
    },
    [spotifyApi]
  ); // Get the artists related to artis in artist show page

  const getArtistTopTracks = useCallback(
    async (id) => {
      const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", 100);
      setArtistTopTracks(topTracks.tracks);
    },
    [spotifyApi]
  ); // get artist top tracks

  const isFollowingArtist = useCallback(
    async (id) => {
      const isFollow = await spotifyApi.isFollowingArtists([id]);
      if (isFollow[0] === true) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    },
    [spotifyApi, setIsFollowing]
  ); // Check if the artist display in artist show page is followed by user

  useEffect(() => {
    const artistId = artistToShow?.id;
    isFollowingArtist(artistId);
    fetchArtistAlbums(artistId);
    getRecommendationsTrackFromArtist(artistId);
    getArtistRelatedArtists(artistId);
    getArtistTopTracks(artistId);
  }, [
    artistToShow,
    fetchArtistAlbums,
    getArtistRelatedArtists,
    getArtistTopTracks,
    getRecommendationsTrackFromArtist,
    isFollowingArtist,
  ]);

  const handleFollow = async () => {
    if (isFollowing) {
      spotifyApi.unfollowArtists([artistToShow?.id]);
      setIsFollowing(false);
      setTimeout(() => {
        settingFollowedArtists();
      }, 1000);
    } else {
      spotifyApi.followArtists([artistToShow?.id]);
      setIsFollowing(true);
      setTimeout(() => {
        settingFollowedArtists();
      }, 1000);
    }
  }; // Following || unfollowing artist

  const setUriFromArtistTopTracks = () => {
    const tracksq = artistTopTracks.map((res) => {
      return res.uri;
    });
    setUri(tracksq);
  }; // fetch uris and set uris to play when user click on artist top track play button

  return {
    artistAlbums,
    setUriFromArtistTopTracks,
    handleFollow,
    relatedArtists,
    artistTopTracks,
    recomendedTracks,
  };
};

export default ArtistShowLogic;
