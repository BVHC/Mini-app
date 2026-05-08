import React, { useEffect, useMemo, useState } from "react";
import StockTable from "../components/stocks/StockTable";
import { useStockContext } from "../contexts/StockContext";
import { useFetch } from "../hooks/useFetch";

const DEFAULT_SYMBOLS = "VHM,VIC,SHB,VCB,NVL,HPG";

const StockPage = () => {
  const { state } = useStockContext();
  const { allStocks } = state;

  const stockPrices = useFetch(`https://protrade.upstock.com.vn/getliststockdata/${DEFAULT_SYMBOLS}`)

  const mergeData = useMemo(() => {
    if (!stockPrices) return [];
    return stockPrices.map(priceData => {
      const masterData = allStocks.find(s => s.stock_code === priceData.sym) || {};
      return { ...masterData, ...priceData };
    });
  }, [allStocks, stockPrices]);

	return (
		<div className="max-w-[1500px] mx-auto w-full flex flex-col h-[calc(100vh-120px)] p-4">
			<div className="flex gap-6 flex-1 min-h-0">
				<div className="flex-[3.5] min-w-0 flex flex-col h-full">
					<StockTable data={mergeData} />
				</div>
			</div>
		</div>
	);
};

export default StockPage;
