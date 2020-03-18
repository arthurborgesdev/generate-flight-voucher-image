import React from 'react';
import './App.css';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Cotacao from './Cotacao';
import Imagem from './Imagem';
import Input from './Input';

const data = [
  {
    "month": "Jan",
    "sales": 2400
  },
  {
    "month": "Fev",
    "sales": 1398
  },
  {
    "month": "Mar",
    "sales": 9800
  },
  {
    "month": "Abr",
    "sales": 3908
  },
  {
    "month": "Mai",
    "sales": 4800
  },
  {
    "month": "Jun",
    "sales": 3800
  },
  {
    "month": "Jul",
    "sales": 4300
  },
  {
    "month": "Ago",
    "sales": 4300
  },
  {
    "month": "Set",
    "sales": 4300
  },
  {
    "month": "Out",
    "sales": 4300
  },
  {
    "month": "Nov",
    "sales": 4300
  },
  {
    "month": "Dez",
    "sales": 4300
  }
]

class SalesLineChart extends React.Component {
  colorLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  }

  tooltipContent(tooltipProps) {
    let month = undefined;
    let sales = undefined;
    if (tooltipProps.payload[0] !== undefined) {
      console.log(tooltipProps.payload[0].payload)
      month = tooltipProps.payload[0].payload.month;
      sales = tooltipProps.payload[0].payload.sales;
    }

    return (
      <div style={{ background: "black" }}>
        <div style={{ color: "#e40039", padding: "100", fontSize: "12" }}>{month} : R$ {sales}</div>
      </div>

    )
  }

  render() {
    return (
      <div>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis interval={0} dataKey="month" tick={{ fontSize: 16 }} />
          <YAxis tick={{ fontSize: 16 }} />
          <Tooltip content={this.tooltipContent} />
          <Legend formatter={this.colorLegendText} />
          <Line type="monotone" dataKey="sales" stroke="#e40039" />
        </LineChart>
      </div>
    )
  }
}


function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <SalesLineChart />
        </header>
      </div>
      <Cotacao />
    </>
  );
}

export default App;
