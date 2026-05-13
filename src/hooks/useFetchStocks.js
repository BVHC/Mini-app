import { useEffect, useRef, useState } from "react";
import { chunkArray } from "../utils/chunkArray";

const BATCH_SIZE = 50;
const URL = `https://protrade.upstock.com.vn/getliststockdata`;

export const useFetchStocks = (symbols) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const abortControllerRef = useRef(null);

	useEffect(() => {
		if (!symbols || symbols.length === 0) {
			setData([]);
			return;
		}

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// Tạo AbortController mới
		const controller = new AbortController();
		abortControllerRef.current = controller;

		const fetchAPI = async () => {
			try {
				setLoading(true);
				const batches = chunkArray(symbols, BATCH_SIZE);

				const results = await Promise.all(
					batches.map((b) => {
						const symbolStr = b.join(",");
						return fetch(`${URL}/${symbolStr}`, {
							signal: controller.signal,
						}).then((res) => {
							if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
							return res.json();
						});
					}),
				);

				// Gộp kết quả từ tất cả batch thành 1 mảng phẳng
				const allData = results.flat();
				setData(allData);
				setLoading(false);
			} catch (err) {
				if (err.name === "AbortError") {
					return;
				}
				setError(err.message);
				setLoading(false);
			}
		};

		fetchAPI();

		return () => {
			controller.abort();
		};
	}, [symbols]);

	return { data, loading, error };
};
