import "./SideBar.scss";

import { MenuList } from "../../Models/sidebar-menulist.model";
import { NavLink } from "react-router-dom";
import { sidebarMenuLists } from "../../Constants/sidebar-menulist";

const SideMenu = () => {
	const menuList = sidebarMenuLists as MenuList[];
	return (
		<nav className="SideMenu">
			<ul>
				{menuList.map((item: MenuList) => (
					<li key={item.menuId}>
						<NavLink className="link" to={item.label.toLowerCase()}>
							<img src={item.imageUrl} alt={item.alt} />
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SideMenu;
