import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PeoplePage from './pages/PeoplePage';
import LeadsPage from './pages/LeadsPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
      <MobileBottomNav />
    </Router>
  );
}

export default App;
