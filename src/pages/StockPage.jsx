import React, { useEffect, useMemo, useState } from "react";
import StockTable from "../components/stocks/StockTable";
import { useStockContext } from "../hooks/useStockContext";
import { useFetch } from "../hooks/useFetch";
import FilterBar from "../components/admin/FilterBar";

const PAGE_SIZE = 15;

const StockPage = () => {
	const { state } = useStockContext();
	const { allStocks } = state;

	const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("ALL");
	const [filterSector, setFilterSector] = useState("ALL");

	const filteredStocks = useMemo(() => {
		return allStocks.filter((stock) => {
			//search
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

	// Reset về trang 1 khi thay đổi bộ lọc
	useEffect(() => {
		setCurrentPage(1);
	}, [searchText, filterType, filterSector]);

	const paginatedStocks = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filteredStocks.slice(start, start + PAGE_SIZE);
	}, [filteredStocks, currentPage]);

	const symbols = useMemo(() => {
		return paginatedStocks.map((s) => s.stock_code).join(",");
	}, [paginatedStocks]);

	const stockPrices = useFetch(
		`https://protrade.upstock.com.vn/getliststockdata/${symbols}`,
	);

	//   console.log(symbols)
	// console.log(paginatedStocks)
	//   console.log(stockPrices)
	// console.log("-----------")

	const mergeData = useMemo(() => {
		if (!stockPrices) return [];
		return stockPrices.map((priceData) => {
			const masterData =
				paginatedStocks.find((s) => s.stock_code === priceData.sym) || {};
			return { ...masterData, ...priceData };
		});
	}, [paginatedStocks, stockPrices]);

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
		<div className="max-w-[1500px] mx-auto w-full flex flex-col h-[calc(100vh-120px)]">
			<div className="flex gap-6 flex-1 min-h-0">
				<div className="flex-[3.5] min-w-0 flex flex-col h-full">
					<StockTable
						data={mergeData}
						pagination={{
							current: currentPage,
							pageSize: PAGE_SIZE,
							total: filteredStocks.length,
							showSizeChanger: false,
							onChange: (page) => setCurrentPage(page),
						}}
					/>
				</div>
			</div>
		</div></>
	);
};

export default StockPage;
