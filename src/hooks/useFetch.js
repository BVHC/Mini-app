import { useEffect, useState } from "react";

export const useFetch = (url) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!url) return;

		const fetchAPI = async () => {
			try {
				const res = await fetch(url);
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

				const result = await res.json();
				setData(result);
			} catch (err) {
				console.log(err);
			}
		};

		fetchAPI();
	}, [url]);

	return data;
};
