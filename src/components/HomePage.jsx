import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Track your job search progress with detailed insights and metrics'
    },
    {
      icon: '🎯',
      title: 'Smart Organization',
      description: 'Categorize and filter applications by status, company, and date'
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: 'Monitor your journey from application to offer with visual timelines'
    },
    {
      icon: '🔔',
      title: 'Deadline Alerts',
      description: 'Never miss follow-ups with smart notifications and reminders'
    }
  ];

  return (
    <main className="main fade-in">
      <div className="container">
        {/* Hero Section */}
        <section className="mb-xl">
          <div className="card p-xl">
            <div className="text-center mb-lg">
              <h1 className="text-primary mb-sm">
                {user ? `Welcome back, ${user.email.split('@')[0]}!` : 'Job Application Tracker Pro'}
              </h1>
              <p className="text-lg text-gray mb-lg">
                {user 
                  ? 'Manage your job search efficiently with our professional tools'
                  : 'The enterprise-grade platform for managing your job search journey'
                }
              </p>
              
              {user ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
                    <Link to="/dashboard" className="btn btn-primary btn-lg w-full sm:w-auto">
                    <span className="mr-2">📊</span> Go to Dashboard
                    </Link>
                    <Link to="/add-application" className="btn btn-secondary btn-lg w-full sm:w-auto">
                    <span className="mr-2">➕</span> Add New Application
                    </Link>
                </div>
                ) : (
                <div className="flex flex-col items-center gap-md">
                    <Link to="/login" className="btn btn-primary btn-lg w-full sm:w-auto">
                    <span className="mr-2">🚀</span> Get Started Free
                    </Link>
                    <p className="text-sm text-gray">
                    No credit card required • 14-day free trial
                    </p>
                </div>
                )}
            </div>

            {/* Stats Preview */}
            {user && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-xl">
                <div className="text-center p-md">
                  <div className="text-2xl font-bold text-primary mb-xs">24</div>
                  <div className="text-sm text-gray">Active Applications</div>
                </div>
                <div className="text-center p-md">
                  <div className="text-2xl font-bold text-success mb-xs">3</div>
                  <div className="text-sm text-gray">Interviews Scheduled</div>
                </div>
                <div className="text-center p-md">
                  <div className="text-2xl font-bold text-warning mb-xs">18</div>
                  <div className="text-sm text-gray">Under Review</div>
                </div>
                <div className="text-center p-md">
                  <div className="text-2xl font-bold text-error mb-xs">3</div>
                  <div className="text-sm text-gray">Rejected</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-xl">
          <h2 className="text-center mb-lg">Professional Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {features.map((feature, index) => (
              <div key={index} className="card p-lg slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-md">{feature.icon}</div>
                  <h4 className="mb-sm">{feature.title}</h4>
                  <p className="text-sm text-gray">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section>
            <div className="card p-xl text-center">
              <h2 className="mb-md">Ready to organize your job search?</h2>
              <p className="text-lg text-gray mb-lg">
                Join thousands of professionals who use JobTrack Pro to land their dream jobs
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
                <Link to="/login" className="btn btn-primary btn-lg w-full sm:w-auto">
                  <span>🎯</span> Start Free Trial
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg w-full sm:w-auto">
                  <span>📞</span> Schedule Demo
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="mt-xl">
          <h3 className="text-center mb-lg">Trusted by Professionals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="card p-lg">
              <p className="text-gray mb-md">
                "JobTrack Pro transformed my job search. I went from disorganized spreadsheets to a professional workflow."
              </p>
              <div className="flex items-center gap-sm">
                <div className="avatar">SS</div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-xs text-gray">Senior UX Designer</div>
                </div>
              </div>
            </div>
            <div className="card p-lg">
              <p className="text-gray mb-md">
                "The analytics helped me understand where to focus my efforts. Landed 3 offers in 2 months!"
              </p>
              <div className="flex items-center gap-sm">
                <div className="avatar">MK</div>
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-xs text-gray">Software Engineer</div>
                </div>
              </div>
            </div>
            <div className="card p-lg">
              <p className="text-gray mb-md">
                "Finally a tool that understands the modern job search. The mobile experience is flawless."
              </p>
              <div className="flex items-center gap-sm">
                <div className="avatar">AR</div>
                <div>
                  <div className="font-semibold">Alex Rodriguez</div>
                  <div className="text-xs text-gray">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;