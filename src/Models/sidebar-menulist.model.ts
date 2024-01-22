export interface MenuList {
	menuId: MainMenu;
	label: string;
	imageUrl: string;
	activeImageUrl: string;
	alt: string;
	isActive?: boolean;
	subItem: SubMenuList[];
}

export interface SubMenuList {
	label?: string;
	link?: string;
	isActive?: boolean;
	enableExport?: boolean;
	headerMenu?: HeaderMenu[];
}

interface HeaderMenu {
	label?: string;
	link?: string;
	isActive?: boolean;
}

export enum MainMenu {
	Info = 1,
	Leave = 2,
	TimeSheet = 3,
}
