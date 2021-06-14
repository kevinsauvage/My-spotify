import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import ArtistCard from "../artistCard/ArtistCard";
import ClickableTitle from "../../../components/clickableTitle/ClickableTitle";
import "./ArtistsRelated.scss";

const ArtistsRelated = ({ id, setError, artistSelected }) => {
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist

  const { spotifyApi, checkIfArtistsAreFollowed } = useContext(AppContext);

  useEffect(() => {
    const getArtistRelatedArtists = async () => {
      try {
        const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
        const sortedArtists = relatedArtists.artists.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        const ArtistsWithFollow = await checkIfArtistsAreFollowed(
          sortedArtists
        );
        setRelatedArtists(ArtistsWithFollow);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    id && getArtistRelatedArtists();
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
              <ArtistCard
                url={
                  artist?.artist.images?.[2]?.url ||
                  artist?.artist.images?.[1]?.url ||
                  artist?.artist.images?.[0]?.url
                }
                name={artist.artist.name}
                id={artist.artist.id}
                height="100px"
                width="100px"
                followed={artist.follow}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsRelated;
