import { Table } from "antd";

// Strict color rule handler
const getColorClass = (price, r, c, f) => {
	const p = parseFloat(price);
	const ref = parseFloat(r);
	const ceil = parseFloat(c);
	const floor = parseFloat(f);

	if (!price || price === 0 || price === "0") return "text-slate-700";
	if (p >= ceil) return "text-[#e040fb]"; // Tím (Trần)
	if (p <= floor) return "text-[#00e5ff]"; // Cyan (Sàn)
	if (p > ref) return "text-[#00c853]"; // Xanh lá (Tăng)
	if (p < ref) return "text-[#ff1744]"; // Đỏ (Giảm)
	return "text-[#ffd600]"; // Vàng (Tham chiếu)
};

const parseG = (gStr) => {
	if (!gStr) return { price: 0, vol: 0 };
	const parts = gStr.split("|");
	return { price: parts[0] || 0, vol: parts[1] || 0 };
};

const createGColumn = (title, gKey, showVol = false) => ({
	title,
	render: (_, record) => {
		const { price, vol } = parseG(record[gKey]);
		const value = showVol ? vol : price;
		return (
			<span className={getColorClass(price, record.r, record.c, record.f)}>
				{value || "-"}
			</span>
		);
	},
});

const StockTable = ({ data, loading, onRowClick }) => {
	const columns = [
		{
			title: "MÃ",
			dataIndex: "sym",
			key: "sym",
			sorter: (a, b) => a.sym.length - b.sym.length,
			render: (text, record) => (
				<span
					className={`font-medium cursor-pointer hover:underline ${getColorClass(record.lastPrice, record.r, record.c, record.f)}`}
					onClick={() => onRowClick?.(record.sym)}
				>
					{text}
				</span>
			),
		},
		{
			title: <span className="text-[#e040fb]">TRẦN</span>,
			dataIndex: "c",
			key: "c",
			className: "bg-slate-100",
			sorter: (a, b) => a.c - b.c,
			render: (text) => (
				<span className="text-[#e040fb] font-medium">{text}</span>
			),
		},
		{
			title: <span className="text-[#00e5ff]">SÀN</span>,
			dataIndex: "f",
			key: "f",
			className: "bg-slate-100",
			sorter: (a, b) => a.f - b.f,
			render: (text) => (
				<span className="text-[#00e5ff] font-medium">{text}</span>
			),
		},
		{
			title: "TC",
			dataIndex: "r",
			key: "r",
			className: "bg-slate-100",
			sorter: (a, b) => a.r - b.r,
			render: (text) => (
				<span className="text-[#ffd600] font-medium">{text}</span>
			),
		},
		{
			title: "BÊN MUA",
			children: [
				createGColumn("Giá 3", "g3"),
				createGColumn("KL 3", "g3", true),
				createGColumn("Giá 2", "g2"),
				createGColumn("KL 2", "g2", true),
				createGColumn("Giá 1", "g1"),
				createGColumn("KL 1", "g1", true),
			],
		},
		{
			title: "KHỚP LỆNH",
			children: [
				{
					title: "Giá",
					dataIndex: "lastPrice",
					className: "bg-slate-100",
					sorter: (a, b) => a.lastPrice - b.lastPrice,
					render: (text, record) => (
						<span
							className={`font-bold ${getColorClass(text, record.r, record.c, record.f)}`}
						>
							{text || "-"}
						</span>
					),
				},
				{
					title: "KL",
					dataIndex: "lastVolume",
					className: "bg-slate-100",
					sorter: (a, b) => a.lastVolume - b.lastVolume,
					render: (text, record) => (
						<span
							className={getColorClass(
								record.lastPrice,
								record.r,
								record.c,
								record.f,
							)}
						>
							{text || "-"}
						</span>
					),
				},
				{
					title: "+/-",
					dataIndex: "ot",
					className: "bg-slate-100",
					sorter: (a, b) => a.ot - b.ot,
					render: (text, record) => (
						<span
							className={getColorClass(
								record.lastPrice,
								record.r,
								record.c,
								record.f,
							)}
						>
							{text || "-"}
						</span>
					),
				},
			],
		},
		{
			title: "BÊN BÁN",
			children: [
				createGColumn("Giá 1", "g4"),
				createGColumn("KL 1", "g4", true),
				createGColumn("Giá 2", "g5"),
				createGColumn("KL 2", "g5", true),
				createGColumn("Giá 3", "g6"),
				createGColumn("KL 3", "g6", true),
			],
		},
		{
			title: "CAO",
			dataIndex: "highPrice",
			className: "bg-slate-100",
			sorter: (a, b) => a.highPrice - b.highPrice,
			render: (text, record) => (
				<span className={getColorClass(text, record.r, record.c, record.f)}>
					{text}
				</span>
			),
		},
		{
			title: "THẤP",
			dataIndex: "lowPrice",
			className: "bg-slate-100",
			sorter: (a, b) => a.lowPrice - b.lowPrice,
			render: (text, record) => (
				<span className={getColorClass(text, record.r, record.c, record.f)}>
					{text}
				</span>
			),
		},
	];

	return (
		<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
			<Table
				columns={columns}
				dataSource={data}
				rowKey="sym"
				pagination={false}
				loading={loading}
				scroll={{ x: "max-content", y: "calc(100vh - 250px)" }}
				size="small"
				bordered
				rowClassName={(record, index) =>
					index % 2 === 0 ? "bg-white" : "bg-slate-100"
				}
				className="[&_.ant-table-thead>tr>th]:bg-slate-100 [&_.ant-table-thead>tr>th]:text-slate-500 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-thead>tr>th]:text-[12px] [&_.ant-table-thead>tr>th]:text-center [&_.ant-table-cell]:whitespace-nowrap [&_.ant-table-cell]:text-right [&_.ant-table-cell:first-child]:text-left [&_.ant-table-cell:nth-child(2)]:text-center [&_.ant-table-cell:nth-child(3)]:text-center [&_.ant-table-cell:nth-child(4)]:text-center [&_.ant-table-cell]:!transition-colors"
			/>
		</div>
	);
};

export default StockTable;
