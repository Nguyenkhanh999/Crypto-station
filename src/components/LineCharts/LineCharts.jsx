import React, { useEffect, useState } from 'react';
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Statistic, Row, Col } from 'antd';

const LineCharts = ({ historyCalData }) => {
  const [data, setData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    if (historyCalData.prices) {
      const formattedData = historyCalData.prices.map((items) => ({
        date: new Date(items[0]).toLocaleString().slice(0, -5),
        price: items[1],
      }));
      setData(formattedData);
      setLatestPrice(formattedData[formattedData.length - 1]?.price || null);
    }
  }, [historyCalData]);

  return (
    <Row gutter={16}>
      <Col span={24}>
        <LineChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <RechartsLine type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </Col>
      <Col span={12}>
        <Statistic title="Giá mới nhất" value={latestPrice || 'N/A'} precision={2} />
      </Col>
    </Row>
  );
};

export default LineCharts;