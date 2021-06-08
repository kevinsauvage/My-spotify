import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import SectionTitleSidebar from "../sectionTitleSidebar/SectionTitleSidebar";
import Subtitle from "../subtitle/Subtitle";

const SidebarRightCategoryWrapper = ({ data, link, fn, title }) => {
  const handleClick = (e) => {
    const list = Array.from(e.currentTarget.nextElementSibling.children);
    for (let i = 0; i <= list.length - 1; i++) {
      setTimeout(() => {
        list[i].classList.toggle("open");
      }, i * 25);
    }
  };

  return (
    <div className="sidebarRight__categoriesWrapper">
      <div
        className="sidebarRight__categories"
        data-set="categories"
        onClick={handleClick}>
        <SectionTitleSidebar title={title} />
        <IoIosArrowDown />
      </div>
      <div className="sidebarRight__categoryItems ">
        {data &&
          data.map((item, i) => {
            return (
              <Link
                to={{
                  pathname: link + `/${item.id || item}`,
                  state: {
                    id: item.id || item,
                  },
                }}
                key={i}>
                <Subtitle
                  text={item.name || item}
                  id={item.id}
                  name={item.name}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarRightCategoryWrapper;
