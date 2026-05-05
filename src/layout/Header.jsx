import React from "react";
import { useLocation } from "react-router-dom";
import { FiBell, FiSettings } from "react-icons/fi";

const pageTitles = {
	"/tasks": "Task Manager",
	"/stocks": "Stock Dashboard",
	"/admin": "Admin Panel",
};
const Header = () => {
	const location = useLocation();
	const pageTitle = pageTitles[location.pathname] || "Dashboard";

	return (
		<header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
			<h2 className="text-xl font-bold text-slate-800">{pageTitle}</h2>

			<div className="flex items-center gap-5">
				<button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all">
					<FiBell className="w-5 h-5" />
				</button>
				<button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all">
					<FiSettings className="w-5 h-5" />
				</button>
				<div className="w-9 h-9 rounded-full  flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm">
					U
				</div>
			</div>
		</header>
	);
};

export default Header;
