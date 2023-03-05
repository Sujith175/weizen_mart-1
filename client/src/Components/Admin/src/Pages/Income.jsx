import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await axios.get(`/api/income?year=${selectedYear}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIncomeData();
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    axios.get(`/api/income?year=${year}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const selectedYear = '2022'; // Replace with selected year from dropdown or input

  return (
    <div>
      <select onChange={handleYearChange}>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id.yearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default App;
