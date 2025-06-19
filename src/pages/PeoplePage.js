import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await axios.get('/api/people');
        setPeople(response.data);
      } catch (err) {
        setError('Failed to load people data');
      }
    }
    fetchPeople();
  }, []);

  return (
    <div className="people-page">
      <h1>People</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {people.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.empId}</td>
                <td>{person.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No people found.</p>
      )}
      {/* TODO: Add buttons and modals for Add/Edit/Delete */}
    </div>
  );
}

export default PeoplePage;
