import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";

export const useStockContext = () => {
	return useContext(StockContext);
};
