import React, { createContext, useContext, useReducer, useEffect } from "react";
import { stockReducer, initState } from "./stockReducer";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
	const [state, dispatch] = useReducer(stockReducer, initState);

	useEffect(() => {
		const fetchAllStocks = async () => {
			dispatch({ type: "FETCH_START" });
			try {
				const res = await fetch("https://test-webtrading.upse.vn/getlistallstock");
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const result = await res.json();
				dispatch({ type: "FETCH_SUCCESS", payload: result });
			} catch (err) {
				dispatch({ type: "FETCH_ERROR", payload: err.message });
			}
		};

		fetchAllStocks();
	}, []);

	const contextValue = {
		state: {
			...state,
			allStocks: state.data,
		},
		dispatch,
	};

	return (
		<StockContext.Provider value={contextValue}>
			{children}
		</StockContext.Provider>
	);
};

export const useStockContext = () => {
	return useContext(StockContext);
};
