import {
  BsMusicNoteBeamed,
  BsMusicNoteList,
  BsPeopleFill,
} from "react-icons/bs";
import { GiCompactDisc } from "react-icons/gi";
import { Link } from "react-router-dom";
import SidebarNavItem from "../sidebarNavItem/SidebarNavItem";
import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle";
import "./SidebarBrowseSection.scss";

const SidebarBrowseSection = () => {
  const data = [
    { title: "Artists", icon: <BsPeopleFill size={18} /> },
    { title: "Albums", icon: <GiCompactDisc size={18} /> },
    { title: "Playlists", icon: <BsMusicNoteBeamed size={18} /> },
    { title: "Tracks", icon: <BsMusicNoteList size={18} /> },
  ];

  return (
    <div className="sidebarBrowseSection">
      <SidebarSectionTitle title="Browse Music" />
      {data.map((item, i) => {
        return (
          <Link
            key={i}
            to={{
              pathname: `/${item.title}`,
            }}>
            <SidebarNavItem title={item.title} icon={item.icon} />
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarBrowseSection;
