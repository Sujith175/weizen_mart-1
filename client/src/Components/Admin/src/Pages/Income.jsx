import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [selectedYear, setSelectedYear] = useState('');
  const [incomePerMonth, setIncomePerMonth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(`/income/${selectedYear}`);
      setIncomePerMonth(response.data.incomePerMonth);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const renderChart = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!incomePerMonth) {
      return null;
    }

    const data = Object.keys(incomePerMonth).map(month => ({
      name: month,
      income: incomePerMonth[month]
    }));

    return (
      <div style={{marginLeft:"-4rem"}}>
      <LineChart width={1100} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Income per Month ({selectedYear})</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Select Year:
          <select id="year-select" className='border border-gray-400' value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}  style={{ width: 100, height: 30, fontSize: 16, marginBottom: 20 ,marginLeft:5,marginRight:5 }}>
        {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
        </label>
        <button type="submit" disabled={!selectedYear} className='btn btn-blue'>
          Show Chart
        </button>
      </form>
      {renderChart()}
    </div>
  );
}

export default App;
