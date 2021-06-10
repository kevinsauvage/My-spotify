import "./WentWrong.scss";
const WentWrong = ({ title, btn }) => {
  return (
    <div className="wentWrong">
      <h1 className="wentWrong__title">{title}</h1>
      {btn && (
        <button
          className="wentWrong__btn"
          onClick={() => window.location.reload()}>
          Reload
        </button>
      )}
    </div>
  );
};

export default WentWrong;
