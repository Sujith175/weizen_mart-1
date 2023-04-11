import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const fetchData = async (year) => {
    try {
      const response = await axios.get(`/api/data/${year}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  
  return (
    <div>
      <h2 style={{marginLeft:"10rem",marginBottom:"10px"}}>Registered Customers and Farmers per Month ({selectedYear})</h2>
      <label htmlFor="year-select" style={{marginLeft:"20rem"}}>Select year </label>
      <select id="year-select" className='border border-gray-400' value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}  style={{ width: 100, height: 30, fontSize: 16, marginBottom: 20 }}>
        {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <br></br>
      <br></br>
      <br></br>
      <div style={{marginLeft:"-4rem"}}>
      <BarChart width={1100} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Customers" fill="#8884d8" />
        <Bar dataKey="Farmers" fill="#82ca9d" />
      </BarChart>
      </div>
    </div>
  );
};

export default Chart;
