import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';

const ApplicationForm = () => {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobType: '',
    status: '',
    location: '',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
    salary: '',
    jobLink: '',
    contactPerson: '',
    contactEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'];
  const statuses = ['Applied', 'Interview Scheduled', 'Technical Assessment', 'Offer Received', 'Rejected', 'Accepted', 'Withdrawn'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }

    if (!formData.status) {
      newErrors.status = 'Application status is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addApplication(formData);
      
      // Success message and redirect
      setIsSubmitting(false);
      navigate('/applications');
    }
  };

  const handleCancel = () => {
    navigate('/applications');
  };

  return (
    <main className="main fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Add New Application</h1>
          <p className="page-subtitle">
            Track your job application details to stay organized
          </p>
        </div>

        {/* Form Card */}
        <div className="card max-w-4xl mx-auto">
          <div className="card-header">
            <h3 className="mb-0">Application Details</h3>
            <p className="text-sm text-gray mt-xs">Fill in the details of your job application</p>
          </div>

          <form onSubmit={handleSubmit} className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              {/* Left Column */}
              <div className="space-y-lg">
                {/* Company Name */}
                <div className="form-group">
                  <label className="form-label required">
                    <span className="mr-2">🏢</span>
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`form-control ${errors.companyName ? 'error' : ''}`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <div className="form-error">{errors.companyName}</div>
                  )}
                </div>

                {/* Job Title */}
                <div className="form-group">
                  <label className="form-label required">
                    <span className="mr-2">💼</span>
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={`form-control ${errors.jobTitle ? 'error' : ''}`}
                    placeholder="e.g., Senior Frontend Developer"
                  />
                  {errors.jobTitle && (
                    <div className="form-error">{errors.jobTitle}</div>
                  )}
                </div>

                {/* Job Type */}
                <div className="form-group">
                  <label className="form-label required">
                    <span className="mr-2">📋</span>
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={`form-control ${errors.jobType ? 'error' : ''}`}
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.jobType && (
                    <div className="form-error">{errors.jobType}</div>
                  )}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label className="form-label required">
                    <span className="mr-2">📊</span>
                    Application Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-control ${errors.status ? 'error' : ''}`}
                  >
                    <option value="">Select current status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.status && (
                    <div className="form-error">{errors.status}</div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-lg">
                {/* Location */}
                <div className="form-group">
                  <label className="form-label required">
                    <span className="mr-2">📍</span>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-control ${errors.location ? 'error' : ''}`}
                    placeholder="e.g., Remote, San Francisco, CA"
                  />
                  {errors.location && (
                    <div className="form-error">{errors.location}</div>
                  )}
                </div>

                {/* Applied Date */}
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr-2">📅</span>
                    Applied Date
                  </label>
                  <input
                    type="date"
                    name="appliedDate"
                    value={formData.appliedDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Salary */}
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr-2">💰</span>
                    Salary / Compensation
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g., $120,000 - $150,000"
                  />
                </div>

                {/* Job Link */}
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr-2">🔗</span>
                    Job Posting URL
                  </label>
                  <input
                    type="url"
                    name="jobLink"
                    value={formData.jobLink}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://company.com/careers/job-id"
                  />
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="mt-xl">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr-2">👤</span>
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Recruiter or hiring manager name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr-2">✉️</span>
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">
                  <span className="mr-2">📝</span>
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Add any additional notes, such as interview questions, technical requirements, or follow-up actions..."
                />
                <div className="form-text">
                  Add important details like next steps, technical requirements, or personal notes about this application.
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-lg border-t border-gray-light mt-xl">
              <div className="text-sm text-gray">
                <span className="text-error">*</span> Required fields
              </div>
              <div className="flex gap-sm">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Application'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Form Tips */}
        <div className="max-w-4xl mx-auto mt-lg">
          <div className="card">
            <div className="card-body">
              <h4 className="flex items-center gap-sm mb-md">
                <span>💡</span> Tips for Tracking Applications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex items-start gap-sm">
                  <div className="text-primary font-semibold">1.</div>
                  <div className="text-sm text-gray">
                    <span className="font-semibold text-dark">Be specific</span> with job titles and company names for better tracking
                  </div>
                </div>
                <div className="flex items-start gap-sm">
                  <div className="text-primary font-semibold">2.</div>
                  <div className="text-sm text-gray">
                    <span className="font-semibold text-dark">Add links</span> to job postings for quick reference
                  </div>
                </div>
                <div className="flex items-start gap-sm">
                  <div className="text-primary font-semibold">3.</div>
                  <div className="text-sm text-gray">
                    <span className="font-semibold text-dark">Update status</span> regularly to keep your dashboard accurate
                  </div>
                </div>
                <div className="flex items-start gap-sm">
                  <div className="text-primary font-semibold">4.</div>
                  <div className="text-sm text-gray">
                    <span className="font-semibold text-dark">Add notes</span> after interviews or important communications
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

export default ApplicationForm;