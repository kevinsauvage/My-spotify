import React from "react";
import Carousel from "react-multi-carousel";
import responsive from "../../../components/carousel/responsive";
import PlaylistCard from "../playlistCard/PlaylistCard";

const CarouselPlaylist = ({ data, playlistSelected, setId }) => {
  return (
    <div>
      {data && (
        <Carousel responsive={responsive} slidesToSlide={3}>
          {data.map((item, i) => {
            return (
              <PlaylistCard
                key={i}
                idSelectedPlaylist={playlistSelected?.id}
                url={item?.images?.[0]?.url}
                name={item.name}
                id={item.id}
                selectPlaylistFn={setId}
                height="200px"
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselPlaylist;
