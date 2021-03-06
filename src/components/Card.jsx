import React from "react";
import "../assets/stylesheets/Card.scss";

const Card = ({ url, name, artist, onClick, id }) => {
  return (
    <div data-id={id} onClick={onClick} className="card">
      <div
        className="card__img"
        style={{
          backgroundImage: "url(" + url + ")",
        }}>
        <div className="card__detail">
          <h2 className="card__name">{name}</h2>
          <p className="card__artist">{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;