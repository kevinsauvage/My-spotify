import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import responsive from "../../../components/carousel/responsive";
import ArtistCard from "../artistCard/ArtistCard";

const CarouselArtists = ({ artists, artistSelected, setId }) => {
  return (
    <div>
      {artists && (
        <Carousel responsive={responsive} slidesToSlide={3}>
          {artists?.map((item, i) => {
            return (
              <ArtistCard
                key={item.artist.name}
                idSelectedArtist={artistSelected?.id}
                url={
                  item?.artist.images?.[2]?.url || item?.artist.images?.[1]?.url
                }
                name={item.artist.name}
                id={item.artist.id}
                selectArtistFn={setId}
                height="185px"
                followed={item.follow}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselArtists;
