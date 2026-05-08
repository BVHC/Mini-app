import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const MainLayout = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="min-h-screen bg-[#f8fafc]">
			<SideBar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

			<div className={`transition-all duration-300 min-h-screen flex flex-col ${isCollapsed ? "ml-20" : "ml-64"}`}>
				{/* Header */}
        <Header/>
				<main className="flex-1 px-15 py-8 bg-[#F8F9FF]">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
