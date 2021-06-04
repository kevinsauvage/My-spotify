import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import responsive from "./responsive";

const CarouselComponent = ({ data, onClick, link }) => {
  return (
    <div>
      {data && (
        <Carousel responsive={responsive}>
          {data.map((item) => {
            return (
              <Link to={link} key={item.id}>
                <Card
                  url={item.images?.[1].url || item.album.images[0].url}
                  name={item.name}
                  id={item.id}
                  onClick={onClick}
                  artist={item.artists?.[0].name}
                />
              </Link>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
