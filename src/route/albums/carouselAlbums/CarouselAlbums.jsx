import React from "react";
import Carousel from "react-multi-carousel";
import responsive from "../../../components/carousel/responsive";
import AlbumCard from "../albumCard/AlbumCard";

const CarouselAlbums = ({ albums, albumSelected, setId }) => {
  return (
    <div>
      {albums && (
        <Carousel responsive={responsive} slidesToSlide={3}>
          {albums.map((item, i) => {
            return (
              <AlbumCard
                key={i}
                idSelectedAlbum={albumSelected?.id}
                url={item?.images?.[1]?.url || item?.images?.[0]?.url}
                name={item.name}
                id={item.id}
                artist={item.artists?.[0].name}
                selectAlbumFn={setId}
                height="200px"
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselAlbums;
