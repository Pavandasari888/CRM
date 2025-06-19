import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await axios.get('/api/leads');
        setLeads(response.data);
      } catch (err) {
        setError('Failed to load leads data');
      }
    }
    fetchLeads();
  }, []);

  return (
    <div className="leads-page">
      <h1>Leads</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {leads.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Assigned</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.date}</td>
                <td>{lead.assigned ? 'Yes' : 'No'}</td>
                <td>{lead.closed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads found.</p>
      )}
      {/* TODO: Add manual add form and CSV upload component */}
    </div>
  );
}

export default LeadsPage;
