import React, { useState, useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';

const ApplicationsTable = () => {
  const { applications, deleteApplication, updateApplication } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  const itemsPerPage = 10;
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'];
  const statuses = ['All', 'Applied', 'Interview Scheduled', 'Technical Assessment', 'Offer Received', 'Rejected', 'Accepted'];

  // Handle Sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply job type filter
    if (jobTypeFilter !== 'All') {
      filtered = filtered.filter(app => app.jobType === jobTypeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === 'appliedDate') {
        const dateA = new Date(a.appliedDate);
        const dateB = new Date(b.appliedDate);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortConfig.key === 'companyName') {
        return sortConfig.direction === 'asc' 
          ? a.companyName.localeCompare(b.companyName)
          : b.companyName.localeCompare(a.companyName);
      }

      return 0;
    });

    return filtered;
  }, [applications, searchTerm, jobTypeFilter, statusFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredAndSortedApplications.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (application) => {
    setEditingId(application.id);
    setEditForm({ ...application });
  };

  const handleSaveEdit = () => {
    updateApplication(editingId, editForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setJobTypeFilter('All');
    setStatusFilter('All');
    setSortConfig({ key: 'appliedDate', direction: 'desc' });
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'warning';
      case 'Interview Scheduled':
      case 'Technical Assessment': return 'primary';
      case 'Offer Received':
      case 'Accepted': return 'success';
      case 'Rejected': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <main className="main fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">
            Manage and track all your job applications in one place
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{applications.length}</div>
                <div className="text-sm text-gray">Total Applications</div>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-success">
                  {applications.filter(app => app.status === 'Interview Scheduled' || app.status === 'Technical Assessment').length}
                </div>
                <div className="text-sm text-gray">Active Interviews</div>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-warning">
                  {applications.filter(app => app.status === 'Applied').length}
                </div>
                <div className="text-sm text-gray">Pending Review</div>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-error">
                  {applications.filter(app => app.status === 'Rejected').length}
                </div>
                <div className="text-sm text-gray">Rejected</div>
              </div>
              <div className="text-2xl">📉</div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card mb-lg">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-lg">
              <div className="w-full md:w-auto">
                <h3 className="font-semibold">Application Filters</h3>
                <p className="text-sm text-gray">Filter and search your applications</p>
              </div>
              <button 
                onClick={resetFilters}
                className="btn btn-secondary btn-sm"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Search */}
              <div className="form-group">
                <label className="form-label">Search Applications</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray">
                    🔍
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="form-control pl-10"
                    placeholder="Search by company, title, or location..."
                  />
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select
                  value={jobTypeFilter}
                  onChange={(e) => {
                    setJobTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-control"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-control"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-sm mt-lg">
              <button 
                onClick={() => handleSort('companyName')}
                className={`btn btn-sm ${sortConfig.key === 'companyName' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Sort by Company {sortConfig.key === 'companyName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSort('appliedDate')}
                className={`btn btn-sm ${sortConfig.key === 'appliedDate' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Sort by Date {sortConfig.key === 'appliedDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <div className="ml-auto text-sm text-gray">
                Showing {filteredAndSortedApplications.length} of {applications.length} applications
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">All Applications</h3>
          </div>
          
          {filteredAndSortedApplications.length > 0 ? (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Location</th>
                      <th>Date Applied</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map(app => (
                      <tr key={app.id}>
                        {editingId === app.id ? (
                          // Edit Mode
                          <>
                            <td>
                              <input
                                type="text"
                                value={editForm.companyName}
                                onChange={(e) => setEditForm({...editForm, companyName: e.target.value})}
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editForm.jobTitle}
                                onChange={(e) => setEditForm({...editForm, jobTitle: e.target.value})}
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <select
                                value={editForm.jobType}
                                onChange={(e) => setEditForm({...editForm, jobType: e.target.value})}
                                className="form-control form-control-sm"
                              >
                                {jobTypes.filter(t => t !== 'All').map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select
                                value={editForm.status}
                                onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                className="form-control form-control-sm"
                              >
                                {statuses.filter(s => s !== 'All').map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                value={editForm.appliedDate}
                                onChange={(e) => setEditForm({...editForm, appliedDate: e.target.value})}
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <div className="table-actions">
                                <button onClick={handleSaveEdit} className="btn btn-success btn-sm">
                                  Save
                                </button>
                                <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm">
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // View Mode
                          <>
                            <td>
                              <div className="font-semibold">{app.companyName}</div>
                            </td>
                            <td>
                              <div>{app.jobTitle}</div>
                              {app.salary && (
                                <div className="text-xs text-gray mt-xs">💰 {app.salary}</div>
                              )}
                            </td>
                            <td>
                              <span className="badge badge-secondary">{app.jobType}</span>
                            </td>
                            <td>
                              <span className={`badge badge-${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center gap-xs">
                                <span>📍</span>
                                <span>{app.location}</span>
                              </div>
                            </td>
                            <td>
                              <div>{app.appliedDate}</div>
                              <div className="text-xs text-gray">
                                {Math.floor((new Date() - new Date(app.appliedDate)) / (1000 * 60 * 60 * 24))} days ago
                              </div>
                            </td>
                            <td>
                              <div className="table-actions">
                                <button 
                                  onClick={() => handleEdit(app)} 
                                  className="btn btn-text btn-sm"
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button 
                                  onClick={() => handleDelete(app.id)} 
                                  className="btn btn-text btn-sm"
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                                {app.jobLink && (
                                  <a 
                                    href={app.jobLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-text btn-sm"
                                    title="View Job Posting"
                                  >
                                    🔗
                                  </a>
                                )}
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <div className="pagination-info">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedApplications.length)} of {filteredAndSortedApplications.length} entries
                </div>
                <div className="pagination-controls">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-secondary"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-xs">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="px-2 text-gray">...</span>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-secondary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state p-xl">
              <div className="empty-state-icon">📭</div>
              <h4 className="mb-sm">No applications found</h4>
              <p className="text-gray mb-md">
                {searchTerm || jobTypeFilter !== 'All' || statusFilter !== 'All'
                  ? 'Try adjusting your filters or search terms'
                  : 'Start by adding your first job application'}
              </p>
              {searchTerm || jobTypeFilter !== 'All' || statusFilter !== 'All' ? (
                <button onClick={resetFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              ) : (
                <a href="/add-application" className="btn btn-primary">
                  Add Your First Application
                </a>
              )}
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="mt-lg card">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
              <div>
                <h4 className="mb-xs">Export Applications</h4>
                <p className="text-sm text-gray">
                  Download your applications in various formats for external use
                </p>
              </div>
              <div className="flex gap-sm">
                <button className="btn btn-secondary">
                  <span>📥</span> Export as CSV
                </button>
                <button className="btn btn-secondary">
                  <span>📄</span> Export as PDF
                </button>
                <button className="btn btn-secondary">
                  <span>🖨️</span> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplicationsTable;