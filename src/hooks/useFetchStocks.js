import { useEffect, useRef, useState } from "react";
import { chunkArray } from "../utils/chunkArray";

const BATCH_SIZE = 50;
const URL = `https://protrade.upstock.com.vn/getliststockdata`;

export const useFetchStocks = (symbols) => {
	const [data, setData] = useState([]);

	const abortControllerRef = useRef(null);

	useEffect(() => {
		if (!symbols || symbols.length === 0) {
			setData([]);
			return;
		}

		if (abortControllerRef.current) {
			// Khi user chuyển danh mục, request cũ sẽ bị abort
			abortControllerRef.current.abort();
		}

		// Tạo AbortController mới cho lần gọi này
		const controller = new AbortController();
		abortControllerRef.current = controller;

		const fetchAPI = async () => {
			try {
				const batches = chunkArray(symbols, BATCH_SIZE);

				const results = await Promise.all(
					batches.map((b) => {
						const symbolStr = b.join(",");
						return fetch(
							`${URL}/${symbolStr}`,
							{ signal: controller.signal }, // Truyền signal để có thể abort
						).then((res) => {
							if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
							return res.json();
						});
					}),
				);

				// Gộp kết quả từ tất cả batch thành 1 mảng phẳng
        const allData = results.flat();
        setData(allData);

			} catch (err) {
				 if (err.name === "AbortError") {
          return;
        }
			}
		};

		fetchAPI();

    // Cleanup: Hủy request khi component unmount hoặc khi symbols thay đổi (useEffect chạy lại)
    return () => {
      controller.abort();
    };
	}, [symbols]);

	return data;
};
