import React from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { applications } = useApplications();
  const { user } = useAuth();

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'Applied').length,
    interviewScheduled: applications.filter(app => app.status === 'Interview Scheduled').length,
    selected: applications.filter(app => app.status === 'Selected').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
    offerRate: applications.length > 0 ? ((applications.filter(app => app.status === 'Selected').length / applications.length) * 100).toFixed(1) : 0,
  };

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'warning';
      case 'Interview Scheduled': return 'primary';
      case 'Selected': return 'success';
      case 'Rejected': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <main className="main fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">
            Welcome back! Here's your job search progress at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {/* Total Applications */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon primary">📊</div>
              <div className="text-right">
                <div className="stat-change positive">↑ 12%</div>
                <div className="text-xs text-gray">vs last month</div>
              </div>
            </div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>

          {/* Interviews Scheduled */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon success">🎯</div>
              <div className="text-right">
                <div className="stat-change positive">↑ 8%</div>
                <div className="text-xs text-gray">conversion rate</div>
              </div>
            </div>
            <div className="stat-value">{stats.interviewScheduled}</div>
            <div className="stat-label">Interviews Scheduled</div>
          </div>

          {/* Selected */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon warning">🏆</div>
            </div>
            <div className="stat-value">{stats.selected}</div>
            <div className="stat-label">Offers Received</div>
          </div>

          {/* Offer Rate */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon secondary">📈</div>
            </div>
            <div className="stat-value">{stats.offerRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {/* Recent Applications & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">Recent Applications</h3>
              </div>
              <div className="card-body p-0">
                {recentApplications.length > 0 ? (
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Position</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApplications.map((app) => (
                          <tr key={app.id}>
                            <td>
                              <div className="font-semibold">{app.companyName}</div>
                            </td>
                            <td>
                              <div>{app.jobTitle}</div>
                              <div className="text-xs text-gray">{app.jobType}</div>
                            </td>
                            <td>
                              <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                                {app.status}
                              </span>
                            </td>
                            <td>
                              <div>{app.appliedDate}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state p-lg">
                    <div className="empty-state-icon">📭</div>
                    <h4 className="mb-sm">No applications yet</h4>
                    <p className="text-gray mb-md">Start tracking your job applications</p>
                    <Link to="/add-application" className="btn btn-primary">
                      Add Your First Application
                    </Link>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <Link to="/applications" className="btn btn-text">
                  View All Applications →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-lg">
            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="space-y-sm">
                  <Link to="/add-application" className="btn btn-primary w-full justify-start">
                    <span>➕</span> Add New Application
                  </Link>
                  <Link to="/applications" className="btn btn-secondary w-full justify-start">
                    <span>📋</span> View All Applications
                  </Link>
                  <button className="btn btn-secondary w-full justify-start">
                    <span>📤</span> Export to CSV
                  </button>
                  <button className="btn btn-secondary w-full justify-start">
                    <span>🔔</span> Set Reminders
                  </button>
                </div>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">Status Distribution</h3>
              </div>
              <div className="card-body">
                <div className="space-y-md">
                  {[
                    { status: 'Applied', count: stats.applied, color: 'warning' },
                    { status: 'Interview', count: stats.interviewScheduled, color: 'primary' },
                    { status: 'Selected', count: stats.selected, color: 'success' },
                    { status: 'Rejected', count: stats.rejected, color: 'error' },
                  ].map((item) => (
                    <div key={item.status} className="space-y-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.status}</span>
                        <span className="text-sm font-semibold">{item.count}</span>
                      </div>
                      <div className="h-2 bg-gray-light rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${item.color}`}
                          style={{ 
                            width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-md mb-md">
                  <div className="avatar-xl">{user?.email?.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="font-semibold text-lg">
                      {user?.email?.split('@')[0]}
                    </div>
                    <div className="text-sm text-gray">{user?.email}</div>
                    <div className="badge badge-primary mt-xs">{user?.role}</div>
                  </div>
                </div>
                <div className="text-sm text-gray">
                  <div className="flex justify-between mb-xs">
                    <span>Member since:</span>
                    <span className="font-medium">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Account type:</span>
                    <span className="font-medium">Professional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;