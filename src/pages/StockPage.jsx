import React, {useMemo, useState } from "react";
import StockTable from "../components/stocks/StockTable";
import { useStockContext } from "../hooks/useStockContext";
import { useFetchStocks } from "../hooks/useFetchStocks";
import FilterBar from "../components/admin/FilterBar";
import StockDetailModal from "../components/stocks/StockDetailModal";

const PAGE_SIZE = 15;

const StockPage = () => {
	const { state } = useStockContext();
	const { allStocks } = state;

	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("ALL");
	const [filterSector, setFilterSector] = useState("ALL");

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredSymbols = useMemo(() => {
    const listFilterStocks = allStocks.filter((stock) => { // Đây là Object chứa thông tin của 1 mã chứng khoán 
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

		return listFilterStocks.map((stock) => stock.stock_code); // Trả về 1 Array chứa các mã chứng khoán thỏa mãn điều kiện lọc

	}, [allStocks, searchText, filterType, filterSector]);

  const stockPrices = useFetchStocks(filteredSymbols);

  const handleRowClick = (symbol) => {
    setSelectedSymbol(symbol);
    setIsModalOpen(true);
  };


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
							data={stockPrices}
              onRowClick={handleRowClick}
						/>
					</div>
				</div>
			</div>

      <StockDetailModal
        symbol={selectedSymbol}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allStocks={allStocks} 
      />
		</>
	);
};

export default StockPage;
