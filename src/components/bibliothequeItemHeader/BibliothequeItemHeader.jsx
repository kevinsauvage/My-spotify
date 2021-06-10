import "./BibliothequeItemHeader.scss";
import { MdQueueMusic } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { RiPlayCircleLine } from "react-icons/ri";

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
      {duration && (
        <p className="bibliothequeItemHeader__duration">
          <BiTimer size={22} />
        </p>
      )}
      {owner && <p className="bibliothequeItemHeader__owner">Owner</p>}
      {play && (
        <p className="bibliothequeItemHeader__play">
          <RiPlayCircleLine size={20} />
        </p>
      )}
      {queu && (
        <p className="bibliothequeItemHeader__icon">
          <MdQueueMusic size={22} />
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
