import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import responsive from "./responsive";
import Card from "../card/Card";
import "./CarouselComponent.scss";

const CarouselComponent = ({ data, selected, setId, save, unSave, link }) => {
  return (
    <div className="carousel">
      {data && (
        <Carousel responsive={responsive} slidesToSlide={3}>
          {data.map((item, i) => {
            return (
              <Card
                key={i}
                selected={selected}
                url={
                  item.item?.album?.images?.[1]?.url ||
                  item.item?.images?.[1]?.url ||
                  item.item?.images?.[0]?.url ||
                  item.icons?.[0]?.url ||
                  item.images?.[0].url
                }
                name={item?.item?.name}
                artistName={
                  item.item?.artists?.[0].name || item?.artists?.[0].name
                }
                playlistName={item.name}
                id={item.item?.id || item?.id}
                setId={setId}
                height="220px"
                followed={item.follow}
                save={save}
                unSave={unSave}
                link={link}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
