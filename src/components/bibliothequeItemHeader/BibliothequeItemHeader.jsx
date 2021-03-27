import "./BibliothequeItemHeader.scss";
import { MdQueueMusic } from "react-icons/md";

const BibliothequeItemHeader = ({
  name,
  artist,
  duration,
  play,
  queu,
  year,
  popularity,
  album,
  owner,
}) => {
  return (
    <div className="bibliothequeItemHeader">
      {name && <p className="bibliothequeItemHeader__name">Name</p>}
      {album && <p className="bibliothequeItemHeader__album">Album</p>}
      {artist && <p className="bibliothequeItemHeader__artist">Artist</p>}
      {duration && <p className="bibliothequeItemHeader__duration">Duration</p>}
      {owner && <p className="bibliothequeItemHeader__owner">Owner</p>}
      {play && <p className="bibliothequeItemHeader__play">Play</p>}
      {queu && (
        <p className="bibliothequeItemHeader__icon">
          <MdQueueMusic size={18} />
        </p>
      )}
      {year && <p className="bibliothequeItemHeader__years">Years</p>}
      {popularity && (
        <p className="bibliothequeItemHeader__popularity">Popularity</p>
      )}
    </div>
  );
};

export default BibliothequeItemHeader;
