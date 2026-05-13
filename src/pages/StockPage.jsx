import React, { useMemo, useState } from "react";
import StockTable from "../components/stocks/StockTable";
import { useStockContext } from "../hooks/useStockContext";
import { useFetchStocks } from "../hooks/useFetchStocks";
import FilterBar from "../components/shared/FilterBar";
import StockDetailModal from "../components/stocks/StockDetailModal";
import { useStockFilter } from "../hooks/useStockFilter";

const StockPage = () => {
	const { state } = useStockContext();
	const { allStocks } = state;

	const {filteredStocks, searchText, setSearchText, filterType, setFilterType, filterSector, setFilterSector} = useStockFilter(allStocks)

	const [selectedSymbol, setSelectedSymbol] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredSymbols = useMemo(() => filteredStocks.map(s => s.stock_code), [filteredStocks])
	const { data: stockPrices, loading } = useFetchStocks(filteredSymbols);

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
						<StockTable data={stockPrices} loading={loading} onRowClick={handleRowClick} />
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
