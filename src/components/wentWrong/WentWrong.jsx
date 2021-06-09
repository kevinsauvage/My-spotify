import "./WentWrong.scss";
const WentWrong = () => {
  return (
    <div className="wentWrong">
      <h1 className="wentWrong__title">Oupss... , something went wrong!</h1>
      <button
        className="wentWrong__btn"
        onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
};

export default WentWrong;
