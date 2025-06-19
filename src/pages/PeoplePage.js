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
    <div className="people-page p-6">
      <h1 className="text-3xl font-bold mb-6">People</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {people.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person._id} className="border-b">
                  <td className="py-3 px-6">{person.name}</td>
                  <td className="py-3 px-6">{person.email}</td>
                  <td className="py-3 px-6">{person.phone || '-'}</td>
                  <td className="py-3 px-6">{person.role || '-'}</td>
                  <td className="py-3 px-6">{person.active ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 px-6">
                    {/* Placeholder buttons for Edit/Delete */}
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No people found.</p>
      )}
      {/* TODO: Add modals for Add/Edit/Delete */}
    </div>
  );
}

export default PeoplePage;
