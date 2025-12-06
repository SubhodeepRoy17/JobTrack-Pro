import React, { createContext, useState, useContext } from 'react';

const ApplicationContext = createContext();

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      companyName: 'Google',
      jobTitle: 'Frontend Developer',
      jobType: 'Full-time',
      status: 'Interview Scheduled',
      location: 'Remote',
      appliedDate: '2024-01-15',
      notes: 'Technical interview next week'
    },
    {
      id: 2,
      companyName: 'Amazon',
      jobTitle: 'Backend Engineer',
      jobType: 'Full-time',
      status: 'Applied',
      location: 'Seattle, WA',
      appliedDate: '2024-01-10',
      notes: ''
    },
    {
      id: 3,
      companyName: 'Microsoft',
      jobTitle: 'Software Engineer',
      jobType: 'Internship',
      status: 'Selected',
      location: 'Redmond, WA',
      appliedDate: '2024-01-05',
      notes: 'Offer received'
    },
    {
      id: 4,
      companyName: 'Meta',
      jobTitle: 'React Developer',
      jobType: 'Contract',
      status: 'Rejected',
      location: 'Remote',
      appliedDate: '2024-01-03',
      notes: 'Not enough experience'
    },
    {
      id: 5,
      companyName: 'Apple',
      jobTitle: 'iOS Developer',
      jobType: 'Full-time',
      status: 'Applied',
      location: 'Cupertino, CA',
      appliedDate: '2024-01-12',
      notes: 'Awaiting response'
    }
  ]);

  const addApplication = (application) => {
    const newApplication = {
      ...application,
      id: applications.length + 1,
      appliedDate: application.appliedDate || new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, newApplication]);
  };

  const updateApplication = (id, updatedData) => {
    setApplications(
      applications.map(app => 
        app.id === id ? { ...app, ...updatedData } : app
      )
    );
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const value = {
    applications,
    addApplication,
    updateApplication,
    deleteApplication
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};