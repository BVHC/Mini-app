import React, { useMemo, useState } from "react";

export const useStockFilter = (allStocks) => {
	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("ALL");
	const [filterSector, setFilterSector] = useState("ALL");

	const filteredStocks = useMemo(() => {
		return allStocks.filter((stock) => {
			const matchSearch =
        searchText === "" ||
				stock.stock_code.toLowerCase().includes(searchText.toLowerCase()) ||
				stock.name_vn.toLowerCase().includes(searchText.toLowerCase());

			const matchType = filterType === "ALL" || stock.stock_type === filterType;

			const matchSector =
				filterSector === "ALL" || stock.sector_vn === filterSector;

			return matchSearch && matchType && matchSector;
		});
	}, [allStocks, searchText, filterType, filterSector]);

  return {filteredStocks, searchText, setSearchText, filterType, setFilterType, filterSector, setFilterSector}
};
