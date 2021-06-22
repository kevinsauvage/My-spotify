import { useContext, useEffect, useState } from "react";
import Card from "../card/Card";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import "./ArtistsRelated.scss";
import { AppContext } from "../../context/AppContext";

const ArtistsRelated = ({ id, setError, artistSelected, link }) => {
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist

  const {
    spotifyApi,
    checkIfArtistsAreFollowed,
    unfollowArtist,
    followArtist,
  } = useContext(AppContext);

  useEffect(() => {
    let isMounted = true;
    if (id && isMounted) {
      spotifyApi
        .getArtistRelatedArtists(id)
        .then((response) => {
          if (!isMounted) return;
          return response.artists.sort((a, b) => {
            return b.popularity - a.popularity;
          });
        })
        .then((response) => {
          if (!isMounted) return;
          return checkIfArtistsAreFollowed(response);
        })
        .then((response) => {
          if (!isMounted) return;
          setRelatedArtists(response);
        })
        .catch((error) => {
          if (!isMounted) return;
          console.log(error);
          setError(true);
        });
    }
    return () => (isMounted = false); // abort on unmount for cleanup
  }, [spotifyApi, id, setError, checkIfArtistsAreFollowed]); // Get the artists related to artist

  return (
    <div className="artistRelated">
      <ClickableTitle
        title={`${
          artistSelected?.artists?.[0]?.name || artistSelected?.name
        } Similar Artists`}
      />
      <div className="artistRelated__cards">
        {relatedArtists?.map((artist, i) => {
          return (
            <div key={i} className="artistRelated__card">
              <Card
                url={
                  artist?.item.images?.[2]?.url ||
                  artist?.item.images?.[1]?.url ||
                  artist?.item.images?.[0]?.url
                }
                name={artist.item.name}
                id={artist.item.id}
                height="100px"
                width="100px"
                followed={artist.follow}
                link={link}
                save={followArtist}
                unSave={unfollowArtist}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsRelated;
