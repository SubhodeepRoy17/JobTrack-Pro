import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ApplicationsTable from './components/ApplicationsTable';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/add-application" element={
              <PrivateRoute>
                <ApplicationForm />
              </PrivateRoute>
            } />
            <Route path="/applications" element={
              <PrivateRoute>
                <ApplicationsTable />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div>
                  <div className="logo-text mb-xs">JobTrack Pro</div>
                  <p className="copyright">© 2024 JobTrack Pro Enterprise. All rights reserved.</p>
                </div>
                <div className="footer-links">
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <a href="#" className="footer-link">Terms of Service</a>
                  <a href="#" className="footer-link">Support</a>
                  <a href="#" className="footer-link">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </ApplicationProvider>
    </AuthProvider>
  );
}

export default App;