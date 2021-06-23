import React from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BsMusicNote } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import SidebarNavItem from "../sidebarNavItem/SidebarNavItem";
import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle";
import "./SidebarMyMusic.scss";

const SidebarMyMusic = () => {
  const data = [
    { text: "History", link: "/library", icon: <AiOutlineHistory size={18} /> },
    {
      text: "Favorite",
      link: "/library",
      icon: <MdFavoriteBorder size={18} />,
    },
    { text: "Top", link: "/library", icon: <BsMusicNote size={18} /> },
  ];
  return (
    <div className="sidebarMyMusic">
      <SidebarSectionTitle title="My Music" />
      {data.map((item) => {
        return (
          <Link
            key={item.text}
            className="bibliotheque-item__name"
            to={{
              pathname: `/library/${item.text}`,
              state: {
                id: item.text,
              },
            }}>
            <SidebarNavItem title={item.text} icon={item.icon} />
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarMyMusic;
