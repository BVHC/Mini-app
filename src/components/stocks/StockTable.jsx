import React from "react";
import { Table } from 'antd';

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

const StockTable = ({ data, pagination }) => {

  const columns = [
    {
      title: 'MÃ(sym)',
      dataIndex: 'sym',
      key: 'sym',
      render: (text, record) => <span className={`font-medium ${getColorClass(record.lastPrice, record.r, record.c, record.f)}`}>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name_vn',
      key: 'name_vn',
      render: (text, record) => <span className={`font-medium ${getColorClass(record.lastPrice, record.r, record.c, record.f)}`}>{text}</span>,
    },
    {
      title: 'TC(r)',
      dataIndex: 'r',
      key: 'r',
      render: (text) => <span className="text-[#ffd600]">{text}</span>,
    },
    {
      title: <span className="text-[#e040fb]">TRẦN(c)</span>,
      dataIndex: 'c',
      key: 'c',
      render: (text) => <span className="text-[#e040fb]">{text}</span>,
    },
    {
      title: <span className="text-[#00e5ff]">SÀN(f)</span>,
      dataIndex: 'f',
      key: 'f',
      render: (text) => <span className="text-[#00e5ff]">{text}</span>,
    },
    {
      title: 'MỞ CỬA',
      dataIndex: 'openPrice',
      key: 'openPrice',
      render: (text, record) => <span className={getColorClass(text, record.r, record.c, record.f)}>{text}</span>,
    },
    {
      title: 'CAO',
      dataIndex: 'highPrice',
      key: 'highPrice',
      render: (text, record) => <span className={getColorClass(text, record.r, record.c, record.f)}>{text}</span>,
    },
    {
      title: 'THẤP',
      dataIndex: 'lowPrice',
      key: 'lowPrice',
      render: (text, record) => <span className={getColorClass(text, record.r, record.c, record.f)}>{text}</span>,
    },
    {
      title: <span className="bg-slate-100 font-bold text-slate-700 block px-2 py-1 -mx-2 -my-1 rounded">KHỚP</span>,
      dataIndex: 'lastPrice',
      key: 'lastPrice',
      render: (text, record) => <span className={`font-bold ${getColorClass(text, record.r, record.c, record.f)}`}>{text}</span>,
    },
    {
      title: '+/-',
      dataIndex: 'ot',
      key: 'ot',
      render: (text, record) => <span className={getColorClass(record.lastPrice, record.r, record.c, record.f)}>{text}</span>,
    },
    {
      title: '%',
      dataIndex: 'changePc',
      key: 'changePc',
      render: (text, record) => <span className={getColorClass(record.lastPrice, record.r, record.c, record.f)}>{text}</span>,
    },
    {
      title: 'KL KHỚP',
      dataIndex: 'lastVolume',
      key: 'lastVolume',
      render: (text) => <span className="text-slate-900">{text}</span>,
    },
    {
      title: 'NN MUA',
      dataIndex: 'fBVol',
      key: 'fBVol',
      render: (text) => <span className="text-slate-900">{text}</span>,
    },
    {
      title: 'NN BÁN',
      dataIndex: 'fSVolume',
      key: 'fSVolume',
      render: (text) => <span className="text-slate-900">{text}</span>,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="sym"
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 250px)' }}
        size="middle"
        className="[&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:text-slate-500 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-thead>tr>th]:text-[13px] [&_.ant-table-thead>tr>th]:uppercase [&_.ant-table-thead>tr>th]:tracking-wider [&_.ant-table-cell]:whitespace-nowrap"
      />
    </div>
  );
};

export default StockTable;
