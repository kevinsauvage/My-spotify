import "./TextLoader.scss";

const TextLoader = ({ height, width, margin }) => {
  return (
    <div
      className="textLoader sectionTitle"
      style={{ height: height, width: width, margin: margin }}></div>
  );
};

export default TextLoader;
