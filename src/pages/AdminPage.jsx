import React, { useState } from "react";
import ListStock from "../components/admin/ListStock";
import FilterBar from "../components/admin/FilterBar";
import { useStockContext } from "../hooks/useStockContext";

const AdminPage = () => {
	const { state } = useStockContext();
	const { allStocks } = state;

	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("ALL");
	const [filterSector, setFilterSector] = useState("ALL");

	const filteredStocks = () => {
		return allStocks.filter((stock) => {
			//search
			const matchSearch =
				stock.stock_code.toLowerCase().includes(searchText.toLowerCase()) ||
				stock.name_vn.toLowerCase().includes(searchText.toLowerCase());

			const matchType = filterType === "ALL" || stock.stock_type === filterType;

			const matchSector = filterSector === "ALL" || stock.sector_vn === filterSector;

			return matchSearch && matchType && matchSector;
		});
	};

	// console.log(filterType)
	// console.log(filteredStocks()); 

	return (
		<>
			<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-1.5">
				<FilterBar
					searchText={searchText}
					setSearchText={setSearchText}
					filterType={filterType}
					setFilterType={setFilterType}
					filterSector={filterSector}
					setFilterSector={setFilterSector}
				/>
			</div>

			<ListStock data={filteredStocks()} />
		</>
	);
};

export default AdminPage;
