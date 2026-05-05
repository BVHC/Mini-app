import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const MainLayout = () => {
	return (
		<div className="min-h-screen bg-[#f8fafc]">
			<SideBar />

			<div className="ml-64 min-h-screen flex flex-col">
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
