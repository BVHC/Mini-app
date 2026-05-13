import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useStockContext } from "../../hooks/useStockContext";

const FilterBar = ({
	searchText,
	setSearchText,
	filterType,
	setFilterType,
	filterSector,
	setFilterSector,
}) => {
	const [text, setText] = useState("");
	const { state } = useStockContext();
	const { allStocks } = state;

	const sectorOptions = [
		{ value: "ALL", label: "Ngành: All" },
		...[
			...new Set(
				allStocks.map((s) => s.sector_vn).filter(Boolean), // bỏ null, undefined, ""
			),
		].map((sector) => ({
			value: sector,
			label: sector,
		})),
	];

	const typeOptions = [
		{ value: "ALL", label: "Loại: All" },
		...Array.from(new Set(allStocks.map((item) => item.stock_type))).map(
			(type) => ({
				value: type,
				label: type,
			}),
		),
	];

	const handleReset = () => {
		setFilterSector("ALL");
		setFilterType("ALL");
		setSearchText("");
		setText("");
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
				options={typeOptions}
				value={filterType}
				onChange={(value) => {
					setFilterType(value);
				}}
			/>

			{/* Ngành */}
			<Select
				defaultValue="ALL"
				className="min-w-[160px]"
				options={sectorOptions}
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
