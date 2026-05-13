import React, { useMemo, useState } from "react";
import ListStock from "../components/admin/ListStock";
import FilterBar from "../components/shared/FilterBar";
import { useStockContext } from "../hooks/useStockContext";
import { useStockFilter } from "../hooks/useStockFilter";

const AdminPage = () => {
	const { state } = useStockContext();
	const { allStocks } = state;
	const {
		filteredStocks,
		searchText,
		setSearchText,
		filterType,
		setFilterType,
		filterSector,
		setFilterSector,
	} = useStockFilter(allStocks);

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

			<ListStock data={filteredStocks} />
		</>
	);
};

export default AdminPage;
