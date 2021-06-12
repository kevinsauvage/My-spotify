import { useRef } from "react";
import "./SidebarDropDown.scss";
import SidebarRightLogic from "./SidebarDropDownLogic";
import SidebarDropDownWrapper from "../sidebarDropDownWrapper/SidebarDropDownWrapper";

const SidebarRight = () => {
  const { dataConfig, sidebarRightIsOpen } = SidebarRightLogic();
  const sidebar = useRef(null);

  return (
    <div
      ref={sidebar}
      className="sidebarRight"
      style={{
        transform: sidebarRightIsOpen ? "translate(-270px)" : null,
      }}>
      {dataConfig.map((data) => {
        return (
          <SidebarDropDownWrapper
            key={data.id}
            data={data.items}
            link={data.link}
            title={data.title}
          />
        );
      })}
    </div>
  );
};

export default SidebarRight;
