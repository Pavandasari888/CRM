import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

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
    <div className="dashboard-page p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Unassigned Leads</h2>
            <p className="text-2xl">{stats.unassignedLeads}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Leads Assigned This Week</h2>
            <p className="text-2xl">{stats.leadsAssignedThisWeek}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Active Salespeople</h2>
            <p className="text-2xl">{stats.activeSalespeople}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Conversion Rate</h2>
            <p className="text-2xl">{stats.conversionRate}%</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      <div className="graph-section bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="conversion" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardPage;
