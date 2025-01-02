import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../assets/css/dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Welcome to the Library Management Dashboard</h1>
          <table className="stats">
            <tr>
                <td className='card-box'>
                    <div className="stat-card">📚 Total Books <br /> 100</div>
                </td>
                <td className='card-box'>
                   <div className="stat-card">👤 Total Authors <br /> 20</div>       
                </td>
            </tr>
            <tr>
                <td className='card-box'>
                <div className="stat-card">🏢 Total Publishers <br /> 5</div>
                </td>
                <td className='card-box'>
                <div className="stat-card">🔖 Active Borrows <br /> 15</div>
                </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  );
}
