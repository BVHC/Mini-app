import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { SearchOutlined } from "@ant-design/icons";

const FilterBar = ({
	searchText,
	setSearchText,
	filterType,
	setFilterType,
	filterSector,
	setFilterSector,
}) => {
	const [text, setText] = useState("");

	const handleReset = () => {
		setFilterSector("ALL");
		setFilterType("ALL");
		setSearchText("");
	};

	const handleSearch = () => {
		setSearchText(text);
	};
	return (
		<div className="flex flex-wrap items-center gap-3">
			{/* Search */}
			<div className="w-[50%] flex justify-between">
				<Input
					value={text}
					className="mr-3"
					placeholder="Tìm mã CK..."
					prefix={<FiSearch className="text-slate-400 mr-1" />}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button type="primary" onClick={handleSearch}>
					Search
				</Button>
			</div>

			{/* Type */}
			<Select
				defaultValue="ALL"
				className="w-[140px]"
				options={[
					{ value: "ALL", label: "Loại: All" },
					{ value: "S", label: "Loại: S" },
					{ value: "E", label: "Loại: E" },
					{ value: "W", label: "Loại: W" },
				]}
				value={filterType}
				onChange={(value) => {
					setFilterType(value);
					// console.log(value);
				}}
			/>

			{/* Ngành */}
			<Select
				defaultValue="ALL"
				className="min-w-[160px]"
				options={[
					{ value: "ALL", label: "Ngành: All" },
					{ value: "Hóa chất", label: "Hóa chất" },
					{ value: "Nước & Khí đốt", label: "Nước & Khí đốt" },
					{ value: "Xây dựng và Vật liệu", label: "Xây dựng và Vật liệu" },
					{ value: "Bất động sản", label: "Bất động sản" },
					{ value: "Bán lẻ", label: "Bán lẻ" },
					{ value: "Kim loại", label: "Kim loại" },
					{ value: "Điện", label: "Điện" },
					{ value: "Vận tải", label: "Vận tải" },
					{ value: "Công nghiệp nặng", label: "Công nghiệp nặng" },
					{
						value: "Thiết bị và Dịch vụ Y tế",
						label: "Thiết bị và Dịch vụ Y tế",
					},
					{ value: "Ngân hàng", label: "Ngân hàng" },
					{ value: "Hàng công nghiệp", label: "Hàng công nghiệp" },
					{ value: "Dược phẩm", label: "Dược phẩm" },
					{ value: "Sản xuất thực phẩm", label: "Sản xuất thực phẩm" },
				]}
				value={filterSector}
				onChange={(value) => {
					setFilterSector(value);
					// console.log(value);
				}}
			/>

			{/* Refresh */}
			<Button
				onClick={handleReset}
				type="primary"
				shape="circle"
				className="text-slate-600 font-medium bg-blue-500"
			>
				{searchText != "" || filterType != "ALL" || filterSector != "ALL" ? (
					<LuFilterX />
				) : (
					<LuFilter />
				)}
			</Button>
		</div>
	);
};

export default FilterBar;
