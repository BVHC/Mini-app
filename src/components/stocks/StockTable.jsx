import React from "react";

// Strict color rule handler
const getColorClass = (price, r, c, f) => {
	const p = parseFloat(price);
	const ref = parseFloat(r);
	const ceil = parseFloat(c);
	const floor = parseFloat(f);

	if (!price || price === "0") return "text-slate-700";
	if (p >= ceil) return "text-[#e040fb]"; // Tím (Trần)
	if (p <= floor) return "text-[#00e5ff]"; // Cyan (Sàn)
	if (p > ref) return "text-[#00c853]"; // Xanh lá (Tăng)
	if (p < ref) return "text-[#ff1744]"; // Đỏ (Giảm)
	return "text-[#ffd600]"; // Vàng (Tham chiếu)
};

const StockTable = ({ data }) => {
	return (
		<div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm h-full">
			<table className="w-full text-sm text-right whitespace-nowrap">
				<thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-sm">
					<tr className="text-slate-500 font-semibold text-[13px] uppercase tracking-wider">
						<th className="px-4 py-3 text-left">MÃ(sym)</th>
            <th className="px-4 py-3 text-left">Name</th>
						<th className="px-3 py-3">TC(r)</th>
						<th className="px-3 py-3 text-[#e040fb]">TRẦN(c)</th>
						<th className="px-3 py-3 text-[#00e5ff]">SÀN(f) </th>
						<th className="px-3 py-3">MỞ CỬA (openPrice)</th>
						<th className="px-3 py-3">CAO(highPrice)</th>
						<th className="px-3 py-3">THẤP(lowPrice)</th>
						<th className="px-4 py-3 bg-slate-100 font-bold text-slate-700">
							KHỚP(lastPrice)
						</th>
						<th className="px-3 py-3">+/-(ot)</th>
						<th className="px-3 py-3">%(changePc)</th>
						<th className="px-4 py-3">KL KHỚP(lastVolume)</th>
						<th className="px-3 py-3">NN MUA(fBVol)</th>
						<th className="px-3 py-3">NN BÁN(fSVolume)</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{!data || data.length === 0 ? (
						<tr>
							<td
								colSpan="13"
								className="px-4 py-16 text-center text-slate-500 font-medium"
							>
								Đang tải dữ liệu bảng giá...
							</td>
						</tr>
					) : (
						data.map((stock) => {
							const mainColor = getColorClass(
								stock.lastPrice,
								stock.r,
								stock.c,
								stock.f,
							);
							return (
								<tr
									key={stock.sym}
									className="hover:bg-slate-50 transition-colors"
								>
									<td
										className={`px-4 py-3 text-left font-medium ${mainColor}`}
									>
										{stock.sym}
									</td>
                  <td
										className={`px-4 py-3 text-left font-medium ${mainColor}`}
									>
										{stock.name_vn}
									</td>
									<td className="px-3 py-3 text-[#ffd600]">{stock.r}</td>
									<td className="px-3 py-3 text-[#e040fb]">{stock.c}</td>
									<td className="px-3 py-3 text-[#00e5ff]">{stock.f}</td>
									<td
										className={`px-3 py-3 ${getColorClass(stock.openPrice, stock.r, stock.c, stock.f)}`}
									>
										{stock.openPrice}
									</td>
									<td
										className={`px-3 py-3 ${getColorClass(stock.highPrice, stock.r, stock.c, stock.f)}`}
									>
										{stock.highPrice}
									</td>
									<td
										className={`px-3 py-3 ${getColorClass(stock.lowPrice, stock.r, stock.c, stock.f)}`}
									>
										{stock.lowPrice}
									</td>
									<td
										className={`px-4 py-3 font-bold ${mainColor}`}
									>
										{stock.lastPrice}
									</td>
									<td className={`px-3 py-3 ${mainColor}`}>
										{stock.ot}
									</td>
									<td className={`px-3 py-3 ${mainColor}`}>
										{stock.changePc}
									</td>
									<td className="px-4 py-3 text-slate-900">
										{stock.lastVolume}
									</td>
									<td className="px-3 py-3 text-slate-900">
										{stock.fBVol}
									</td>
									<td className="px-3 py-3 text-slate-900">
										{stock.fSVolume}
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default StockTable;
