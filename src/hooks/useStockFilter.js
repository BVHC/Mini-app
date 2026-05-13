import React, { useMemo, useState } from "react";

const removeAccent = (str = "") =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");

const normalizeSearch = (str = "") => {
	return removeAccent(str).toLowerCase().trim();
};

export const useStockFilter = (allStocks) => {
	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("ALL");
	const [filterSector, setFilterSector] = useState("ALL");

	const filteredStocks = useMemo(() => {
		const keyword = normalizeSearch(searchText);

		return allStocks.filter((stock) => {
			const matchSearch =
				searchText === "" ||
				stock.stock_code.toLowerCase().includes(searchText.toLowerCase()) ||
				normalizeSearch(stock.name_vn).includes(keyword);

			const matchType = filterType === "ALL" || stock.stock_type === filterType;

			const matchSector =
				filterSector === "ALL" || stock.sector_vn === filterSector;

			return matchSearch && matchType && matchSector;
		});
	}, [allStocks, searchText, filterType, filterSector]);

	return {
		filteredStocks,
		searchText,
		setSearchText,
		filterType,
		setFilterType,
		filterSector,
		setFilterSector,
	};
};
