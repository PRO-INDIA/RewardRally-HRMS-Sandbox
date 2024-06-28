import "./SideBar.scss";

import { MenuList } from "../../Models/SideBarMenuList.model";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarMenuLists } from "../../Constants/SideBarMenu";

const SideMenu = () => {
  const location = useLocation();
  const menuList = sidebarMenuLists as MenuList[];
  return (
    <nav className="SideMenu">
      <ul>
        {menuList.map((item: MenuList) => (
          <li key={item.menuId}>
            <NavLink className="link" to={item.label.toLowerCase()}>
              <img
                className={`link ${
                  (item.label &&
                    item.label.toLowerCase() ===
                      location.pathname.substring(1)) ||
                  ((!location.pathname.substring(1) ||
                    location.pathname.substring(1) ===
                      "information/personal-info" ||
                    location.pathname.substring(1) ===
                      "information/competency" ||
                    location.pathname.substring(1) ===
                      "information/work-history") &&
                    item.label === "information/personal-info")
                    ? "isActive"
                    : ""
                }`}
                src={item.imageUrl}
                alt={item.alt}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
