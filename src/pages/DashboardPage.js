import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await axios.get('/api/dashboard');
        setStats(response.data.stats);
        setGraphData(response.data.graphData);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stats ? (
        <div className="stats-cards">
          <div className="card">Unassigned Leads: {stats.unassignedLeads}</div>
          <div className="card">Leads Assigned This Week: {stats.leadsAssignedThisWeek}</div>
          <div className="card">Active Salespeople: {stats.activeSalespeople}</div>
          <div className="card">Conversion Rate: {stats.conversionRate}%</div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      <div className="graph-section">
        <h2>Sales Analytics</h2>
        {/* Placeholder for bar chart */}
        <ul>
          {graphData.map((item) => (
            <li key={item.date}>
              {item.date}: {item.conversion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
