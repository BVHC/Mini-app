import React from "react";
import { Table } from "antd";

const columns = [
	{
		title: "STT",
		key: "index",
		render: (text, record, index) => (
			<span className="text-slate-400 font-medium pl-2">{index + 1}</span>
		),
		width: 50,
	},
	{
		title: "Mã CK",
		dataIndex: "stock_code",
		key: "code",
		render: (text) => (
			<span className="text-teal-700 font-bold text-[14px]">{text}</span>
		),
	},
	{
		title: "Tên viết tắt",
		dataIndex: "name_short",
		key: "name_short",
		render: (text) => (
			<span className="text-slate-700 text-[13px] font-medium">{text}</span>
		),
	},
	{
		title: "Loại",
		dataIndex: "stock_type",
		key: "stock_type",
		render: (type) => {
			let colorClass = "bg-slate-100 text-slate-600";
			if (type === "E") colorClass = "bg-[#dbeafe] text-[#1e40af]";
			if (type === "S")
				colorClass = "bg-[#fee2e2] text-[#991b1b]";
      if (type === "W" )
				colorClass = "bg-[#F8F9FF] text-[#4E4E4E]";
			return (
				<span
					className={`px-2 py-0.5 rounded text-[11px] font-bold ${colorClass}`}
				>
					{type}
				</span>
			);
		},
	},
	{
		title: "Sàn",
		dataIndex: "post_to",
		key: "post_to",
		render: (post_to) => {
			let colorClass = "bg-slate-200 text-slate-700";
			if (post_to === "HOSE") colorClass = "bg-[#d1fae5] text-[#065f46]";
			if (post_to === "HNX") colorClass = "bg-[#bae6fd] text-[#075985]";
			if (post_to === "UPCoM") colorClass = "bg-[#e2e8f0] text-[#334155]";
			return (
				<span
					className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${colorClass}`}
				>
					{post_to}
				</span>
			);
		},
	},
	{
		title: "Nguồn",
		dataIndex: "source",
		key: "source",
		render: (source) => (
			<span className="px-2 py-0.5 border border-slate-300 rounded text-[11px] text-slate-400 bg-white">
				{source === "i" ? "i" : source}
			</span>
		),
	},
	{
		title: "Ngành",
		dataIndex: "sector_vn",
		key: "sector_vn",
		render: (text) => (
			<span className="text-slate-500 text-[13px]">{text}</span>
		),
	},
	{
		title: "Tên công ty",
		dataIndex: "name_vn",
		key: "name_vn",
		render: (text) => (
			<span className="text-slate-600 text-[13px]">{text}</span>
		),
	},
];

const ListStock = ({data}) => {
	return (
		<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full overflow-hidden flex flex-col">
			<div className="mb-4">
				<h2 className="text-xl font-bold text-slate-800">
					Danh sách mã chứng khoán
				</h2>
			</div>
			<Table
				columns={columns}
				dataSource={data}
				rowKey="stock_code"
				pagination={{ pageSize: 15 }}
				className="flex-1 overflow-auto"
			/>
		</div>
	);
};

export default ListStock;
