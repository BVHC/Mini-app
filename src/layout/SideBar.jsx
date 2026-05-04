import React from "react";
import { NavLink } from "react-router-dom";
import { FiClipboard, FiShield, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const navItems = [
	{ path: "/tasks", label: "Tasks", icon: <FiClipboard /> },
	{ path: "/stocks", label: "Stock Dashboard", icon: <MdOutlineSpaceDashboard /> },
	{ path: "/admin", label: "Admin Panel", icon: <FiShield /> },
];

const SideBar = () => {
	return (
		<aside
			className="
				fixed top-0 left-0 z-50 h-screen
				w-64
				bg-white
				border-r border-slate-200
				flex flex-col
			"
		>
			{/* Logo */}
			<div className="px-6 py-5 border-b border-slate-100">
				<h1 className="text-2xl font-bold text-indigo-600">MiniApp</h1>
        
			</div>

			{/* Navigation */}
			<nav className="flex flex-col mt-4 px-3 flex-1">
				{navItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 mb-0.5
							${
								isActive
									? "bg-indigo-50 text-indigo-600"
									: "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
							}`
						}
					>
						<span className="text-[18px]">{item.icon}</span>
						<span>{item.label}</span>
					</NavLink>
				))}
			</nav>

		</aside>
	);
};

export default SideBar;
