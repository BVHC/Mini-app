import React, { useMemo } from "react";
import { Modal, Descriptions } from "antd";

const StockDetailModal = ({ symbol, open, onClose, allStocks }) => {
	// Tìm thông tin doanh nghiệp từ master data
	const companyInfo = useMemo(() => {
		if (!symbol) return null;
		return allStocks.find((s) => s.stock_code === symbol);
	}, [symbol, allStocks]);

	return (
		<Modal
			title={`Chi tiết: ${symbol || ""}`}
			open={open}
			onCancel={onClose}
			footer={null}
			width={600}
		>
			{companyInfo ? (
				<Descriptions bordered column={1}>
					<Descriptions.Item label="Mã CK">
						{companyInfo.stock_code}
					</Descriptions.Item>
					<Descriptions.Item label="Tên công ty">
						{companyInfo.name_vn}
					</Descriptions.Item>
					<Descriptions.Item label="Loại">
						{companyInfo.stock_type}
					</Descriptions.Item>
					<Descriptions.Item label="Ngành">
						{companyInfo.sector_vn}
					</Descriptions.Item>
				</Descriptions>
			) : (
				<p>Không tìm thấy thông tin</p>
			)}
		</Modal>
	);
};

export default StockDetailModal;
