import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [leadAssignmentRules, setLeadAssignmentRules] = useState('');
  const [allowEmployeeDeletion, setAllowEmployeeDeletion] = useState(false);
  const [confirmUploads, setConfirmUploads] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await axios.get('/api/settings');
        setSettings(response.data);
        setLeadAssignmentRules(response.data.leadAssignmentRules || '');
        setAllowEmployeeDeletion(response.data.adminControls?.allowEmployeeDeletion || false);
        setConfirmUploads(response.data.adminControls?.confirmUploads || false);
      } catch (err) {
        setError('Failed to load settings');
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.put('/api/settings', {
        leadAssignmentRules,
        adminControls: {
          allowEmployeeDeletion,
          confirmUploads,
        },
      });
      setSettings(response.data);
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {settings ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Lead Assignment Rules:</label>
            <input
              type="text"
              value={leadAssignmentRules}
              onChange={(e) => setLeadAssignmentRules(e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={allowEmployeeDeletion}
                onChange={(e) => setAllowEmployeeDeletion(e.target.checked)}
              />
              Allow Employee Deletion
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={confirmUploads}
                onChange={(e) => setConfirmUploads(e.target.checked)}
              />
              Confirm Uploads
            </label>
          </div>
          <button type="submit">Save Settings</button>
        </form>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
}

export default SettingsPage;
