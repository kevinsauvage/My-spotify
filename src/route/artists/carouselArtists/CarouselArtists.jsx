import React from "react";
import Carousel from "react-multi-carousel";
import responsive from "../../../components/carousel/responsive";
import ArtistCard from "../artistCard/ArtistCard";

const CarouselArtists = ({ artists, artistSelected, setId }) => {
  return (
    <Carousel responsive={responsive} slidesToSlide={3}>
      {artists.map((item, i) => {
        return (
          <ArtistCard
            key={i}
            idSelectedArtist={artistSelected?.id}
            url={item?.images?.[2]?.url || item?.images?.[1]?.url}
            name={item.name}
            id={item.id}
            artist={item.artists?.[0].name}
            selectArtistFn={setId}
            height="200px"
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselArtists;
