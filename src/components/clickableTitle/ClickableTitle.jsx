import "./ClickableTitle.scss";

const ArtistsTitle = ({ condition, fn, title }) => {
  return (
    <h3
      className="clickableTitle"
      style={{
        borderBottom: condition ? "3px solid whitesmoke" : null,
        cursor: fn ? "pointer" : "default",
      }}
      onClick={fn}>
      {title}
    </h3>
  );
};

export default ArtistsTitle;
