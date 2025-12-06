import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    setErrors({});

    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const user = login(formData.email, formData.password);
        if (user) {
          navigate('/dashboard');
        }
      } catch (error) {
        setErrors({ submit: 'Invalid credentials. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="main fade-in">
      <div className="container">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="card overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-xl text-center">
                <div className="text-4xl mb-md">🔐</div>
                <h2 className="text-white mb-xs">Welcome Back</h2>
                <p className="text-white/80">Sign in to continue to JobTrack Pro</p>
              </div>

              {/* Card Body */}
              <div className="card-body p-xl">
                {errors.submit && (
                  <div className="alert alert-error mb-lg">
                    <span className="alert-icon">⚠️</span>
                    <div className="alert-content">
                      <div className="font-semibold">Login Failed</div>
                      <div>{errors.submit}</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-lg">
                  {/* Email Field */}
                  <div className="form-group">
                    <label className="form-label required">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray">
                        📧
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control pl-10 ${errors.email ? 'error' : ''}`}
                        placeholder="you@example.com"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="form-error">{errors.email}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label className="form-label required">Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray">
                        🔒
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-control pl-10 ${errors.password ? 'error' : ''}`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && (
                      <div className="form-error">{errors.password}</div>
                    )}
                    <div className="text-right mt-xs">
                      <Link to="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Remember Me & Submit */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm">Remember me</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading mr-2"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                </form>
              </div>

              {/* Card Footer */}
              <div className="card-footer text-center">
                <p className="text-gray mb-sm">
                  Don't have an account?{' '}
                  <Link to="#" className="text-primary font-semibold hover:underline">
                    Contact Sales
                  </Link>
                </p>
                <div className="text-xs text-gray-light">
                  By continuing, you agree to our{' '}
                  <Link to="#" className="text-primary hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                </div>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="mt-lg card">
              <div className="card-body p-md">
                <h4 className="text-sm font-semibold mb-sm text-center">Demo Accounts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  <div className="bg-primary/5 p-sm rounded-lg border border-primary/10">
                    <div className="font-semibold text-sm mb-xs text-primary">Manager Account</div>
                    <div className="text-xs text-gray mb-xs">hrmanager@gmail.com</div>
                    <div className="text-xs text-gray">Password: any (6+ characters)</div>
                  </div>
                  <div className="bg-secondary/5 p-sm rounded-lg border border-secondary/10">
                    <div className="font-semibold text-sm mb-xs text-secondary">Regular User</div>
                    <div className="text-xs text-gray mb-xs">user@example.com</div>
                    <div className="text-xs text-gray">Password: any (6+ characters)</div>
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

export default LoginForm;