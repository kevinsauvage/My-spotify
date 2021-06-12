import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import ArtistCard from "../artistCard/ArtistCard";
import ClickableTitle from "../../../components/clickableTitle/ClickableTitle";
import "./ArtistsRelated.scss";

const ArtistsRelated = ({ id, setError, artistSelected }) => {
  const [relatedArtists, setRelatedArtists] = useState([]); // array of related artist

  const { spotifyApi } = useContext(AppContext);

  useEffect(() => {
    const getArtistRelatedArtists = async () => {
      try {
        const relatedArtists = await spotifyApi.getArtistRelatedArtists(id);
        const sortedArtists = relatedArtists.artists.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        setRelatedArtists(sortedArtists);
      } catch (error) {
        setError(true);
      }
    };
    id && getArtistRelatedArtists();
  }, [spotifyApi, id, setError]); // Get the artists related to artist

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
                  artist?.images?.[2]?.url ||
                  artist?.images?.[1]?.url ||
                  artist?.images?.[0]?.url
                }
                name={artist.name}
                id={artist.id}
                height="120px"
                width="120px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsRelated;
