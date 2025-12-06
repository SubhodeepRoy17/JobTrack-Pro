import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="main fade-in">
      <div className="container">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Error Code */}
          <div className="relative mb-lg">
            <div className="text-[120px] font-bold text-primary/20">404</div>
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-md">Page Not Found</h1>
            <p className="text-lg text-gray-dark mb-xl">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link to="/" className="btn btn-primary btn-lg">
                <span className="mr-2">🏠</span>
                Go to Homepage
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                <span className="mr-2">📊</span>
                Go to Dashboard
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-xl">
              <p className="text-sm text-gray mb-md">
                If you believe this is an error, please contact support or try:
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;