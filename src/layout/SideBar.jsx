import React from "react";
import { NavLink } from "react-router-dom";
import { FiClipboard, FiShield, FiHelpCircle, FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const navItems = [
	{ path: "/tasks", label: "Tasks", icon: <FiClipboard /> },
	{ path: "/stocks", label: "Stock Dashboard", icon: <MdOutlineSpaceDashboard /> },
	{ path: "/admin", label: "Admin Panel", icon: <FiShield /> },
];

const SideBar = ({ isCollapsed, toggleSidebar }) => {
	return (
		<aside
			className={`
				fixed top-0 left-0 z-50 h-screen
				bg-white
				border-r border-slate-200
				flex flex-col transition-all duration-300
				${isCollapsed ? "w-20" : "w-64"}
			`}
		>
			{/* Logo & Toggle */}
			<div className={`px-6 py-5 border-b border-slate-100 flex items-center ${isCollapsed ? "justify-center px-0" : "justify-between"}`}>
				{!isCollapsed && <h1 className="text-2xl font-bold text-indigo-600 truncate transition-all">MiniApp</h1>}
				<button 
					onClick={toggleSidebar} 
					className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
					title={isCollapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
				>
					{isCollapsed ? <FiChevronRight className="w-6 h-6" /> : <FiChevronLeft className="w-6 h-6" />}
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex flex-col mt-4 px-3 flex-1 overflow-x-hidden">
				{navItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center gap-3 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 mb-0.5
							${
								isActive
									? "bg-indigo-50 text-indigo-600"
									: "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
							}
							${isCollapsed ? "justify-center px-0" : "px-4"}
							`
						}
						title={isCollapsed ? item.label : ""}
					>
						<span className="text-[20px] min-w-[20px]">{item.icon}</span>
						{!isCollapsed && <span className="whitespace-nowrap truncate transition-all">{item.label}</span>}
					</NavLink>
				))}
			</nav>

		</aside>
	);
};

export default SideBar;
