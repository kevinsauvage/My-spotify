import {
  BsMusicNoteBeamed,
  BsMusicNoteList,
  BsPeopleFill,
} from "react-icons/bs";
import { GiCompactDisc } from "react-icons/gi";
import { Link } from "react-router-dom";
import SidebarLeftNavItem from "../sidebarNavItem/SidebarNavItem";
import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle";
import "./SidebarBrowseSection.scss";

const sidebarBrowseSection = () => {
  const data = [
    { title: "Artists", icon: <BsPeopleFill size={24} /> },
    { title: "Albums", icon: <GiCompactDisc size={24} /> },
    { title: "Playlists", icon: <BsMusicNoteBeamed size={24} /> },
    { title: "Tracks", icon: <BsMusicNoteList size={24} /> },
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
            <SidebarLeftNavItem title={item.title} icon={item.icon} />
          </Link>
        );
      })}
    </div>
  );
};

export default sidebarBrowseSection;
