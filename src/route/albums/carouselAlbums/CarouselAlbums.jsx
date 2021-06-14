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
                key={item.album.id}
                idSelectedAlbum={albumSelected?.id}
                url={
                  item?.album.images?.[1]?.url || item?.album.images?.[0]?.url
                }
                name={item.album.name}
                id={item.album.id}
                artist={item.album.artists?.[0].name}
                selectAlbumFn={setId}
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

export default CarouselAlbums;
