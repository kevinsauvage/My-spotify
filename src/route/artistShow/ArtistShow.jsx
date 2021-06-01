import { useContext, useEffect } from "react";
import "./ArtistShow.scss";
import { AppContext } from "../../context/AppContext";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import Loader from "react-loader-spinner";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";
import { useState } from "react/cjs/react.development";

const ArtistShow = () => {
  const props = useContext(AppContext);
  const [artistAlbums, setArtistAlbums] = useState();
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [artistTopTracks, setArtistTopTracks] = useState(undefined); // array of artist top tracks

  useEffect(() => {
    const artistId = props.artistToShow?.id;
    isFollowingArtist(artistId);
    const fetchArtistAlbums = async (id) => {
      const artistAlbums = await props.spotifyApi.getArtistAlbums(id);
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
    };
    fetchArtistAlbums(artistId);
    getRecommendationsTrackFromArtist(artistId);
    getArtistRelatedArtists(artistId);
    getArtistTopTracks(artistId);
  }, [props.artistToShow]);

  const getRecommendationsTrackFromArtist = async (id) => {
    const tracks = await props.spotifyApi.getRecommendations({
      seed_artists: props.artistToShow.id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    props.setPlaylistToPlay(tracks.tracks);
  }; // get Recommendation tracks for a artist

  const getArtistRelatedArtists = async (id) => {
    const relatedArtists = await props.spotifyApi.getArtistRelatedArtists(id);
    const sortedArtists = relatedArtists.artists.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setRelatedArtists(sortedArtists);
  }; // Get the artists related to artis in artist show page

  const getArtistTopTracks = async (id) => {
    const topTracks = await props.spotifyApi.getArtistTopTracks(id, "FR", 100);
    setArtistTopTracks(topTracks.tracks);
  }; // get artist top tracks

  const isFollowingArtist = async (id) => {
    const isFollow = await props.spotifyApi.isFollowingArtists([id]);
    if (isFollow[0] === true) {
      props.setIsFollowing(true);
    } else {
      props.setIsFollowing(false);
    }
  }; // Check if the artist display in artist show page is followed by user

  const handleFollow = async () => {
    if (props.isFollowing) {
      props.spotifyApi.unfollowArtists([props.artistToShow.id]);
      props.setIsFollowing(false);
      setTimeout(() => {
        props.settingFollowedArtists();
      }, 1000);
    } else {
      props.spotifyApi.followArtists([props.artistToShow.id]);
      props.setIsFollowing(true);
      setTimeout(() => {
        props.settingFollowedArtists();
      }, 1000);
    }
  }; // Following || unfollowing artist

  const setUriFromArtistTopTracks = () => {
    const tracksq = props.artistTopTracks.map((res) => {
      return res.uri;
    });
    props.setUri(tracksq);
  }; // fetch uris and set uris to play when user click on artist top track play button

  const settingAlbumToPlay = async (e) => {
    const id = e.currentTarget.dataset.id;
    const album = await props.spotifyApi.getAlbum(id);
    props.setPlaylistToPlay(album.tracks.items);
    props.setTracks(album.tracks.items);
    props.setNameB(album.name);
    props.setDescription(album.artists[0].name);
    props.setFollowers(album.label);
    props.scrollTop();
  };

  return (
    <div className="artist-show">
      {props.isLoading ? (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="#FFF"
            height={40}
            width={40}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          <div className="artist-show__first-wrapper">
            <div
              className="artist-show__banner-image"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(2,8,17,1) 0%, rgba(2,8,17,0.8687850140056023) 50%, rgba(2,8,17,0.6194852941176471) 100%)" +
                  "," +
                  "url(" +
                  props.artistToShow?.images[1].url +
                  ")",
              }}>
              <div className="artist-show__detail">
                {props.artistToShow && (
                  <div className="artist-show__detail__title">
                    <h1 className="artist-show__detail__title">
                      {props.artistToShow?.name}
                    </h1>
                    {props.isFollowing ? (
                      <p onClick={handleFollow} className="follow-btn">
                        <RiUserUnfollowFill size={21} />
                      </p>
                    ) : (
                      <p onClick={handleFollow} className="follow-btn">
                        <RiUserFollowFill size={21} />
                      </p>
                    )}
                  </div>
                )}
                <div className="artist-show__detail__wrapper">
                  {props.artistToShow && (
                    <p>{props.artistToShow?.followers.total}</p>
                  )}
                  <p>Followers</p>
                </div>
                <div className="artist-show__playBtn">
                  <PlayBtn onClick={setUriFromArtistTopTracks} />
                </div>
              </div>
            </div>
            <div className="artist-show__artist-top">
              <h1 className="artist-show__artist-top__title title">
                Artist top tracks
              </h1>
              <div className="artist-show__artist-top__header section-header">
                <BibliothequeItemHeader name artist duration queu play />
              </div>
              <div className="artist-show____artist-top">
                {artistTopTracks &&
                  artistTopTracks.map((track) => {
                    return (
                      <BibliothequeItem
                        key={track.id + Math.random(1000)}
                        name={track.name}
                        id={track.id}
                        artistId={track.artists[0].id}
                        artist={track.artists[0].name}
                        duration={props.millisToMinutesAndSeconds(
                          track.duration_ms
                        )}
                        setTrackToPlay={props.setTrackToPlay}
                        uri={track.track ? track.track.uri : track.uri}
                        addToQueu={props.addToQueu}
                        onClick={props.setTrackShow}
                        onClickArtist={props.setArtistShow}
                        play
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="artist-show__wrapper-second">
            <div className="artist-show__left-column">
              <div className="artist-show__albums">
                <h1 className="artist-show__albums-title title">
                  Artist Albums
                </h1>
                <div className="section-header">
                  <BibliothequeItemHeader album year />
                </div>
                {artistAlbums &&
                  artistAlbums.map((album) => {
                    return (
                      <BibliothequeItem
                        key={album.id}
                        albumName={album.name}
                        year={album.release_date.split("-")[0]}
                        onClick={settingAlbumToPlay}
                        albumId={album.id}
                      />
                    );
                  })}
              </div>
              <div className="artist-show__related-artist">
                <h1 className="artist-show__related-artist__title title">
                  Related Artists
                </h1>
                <div className="section-header">
                  <BibliothequeItemHeader artist popularity />
                </div>
                {relatedArtists &&
                  relatedArtists.map((artist) => {
                    return (
                      <BibliothequeItem
                        key={artist.id}
                        artist={artist.name}
                        popularity={artist.popularity}
                        onClickArtist={props.setArtistShow}
                        artistId={artist.id}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="artist-show__right-column">
              <div className="artist-show__recomended">
                <h1 className="artist-show__recomended__title title">
                  Recomended Tracks
                </h1>
                <PlayBtn onClick={props.setPlaylistUri} />
                <div className="section-header">
                  <BibliothequeItemHeader name artist duration play queu />
                </div>
                {recomendedTracks &&
                  recomendedTracks.map((track) => {
                    return (
                      <BibliothequeItem
                        key={track.id}
                        name={track.name}
                        onClick={props.setTrackShow}
                        id={track.id}
                        artist={track.artists[0].name}
                        duration={props.millisToMinutesAndSeconds(
                          track.duration_ms
                        )}
                        onClickArtist={props.setArtistShow}
                        artistId={
                          track.track
                            ? track.track.artists[0].id
                            : track.album
                            ? track.album.artists[0].id
                            : track.artists
                            ? track.artists[0].id
                            : null
                        }
                        setTrackToPlay={props.setTrackToPlay}
                        uri={track.track ? track.track.uri : track.uri}
                        addToQueu={props.addToQueu}
                        play
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistShow;
