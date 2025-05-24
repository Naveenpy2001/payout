import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OtpVerification from './OtpVerification';
import './style.css';
import Navbar from '../../pages/components/Navbar';
import Footer from '../../pages/components/Footer';


const EmpLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login submitted:', formData);
      // API call would go here
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // Handle Google auth with your backend
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
  };

  return (
    <>
    <Navbar />
   <div className="emp-auth-container">
      <div className="emp-hero-section">
        <div className="emp-hero-content">
          <h1>Welcome Back Employers!</h1>
          <p>
            Streamline your hiring process with our powerful recruitment tools.
            Access your dashboard to manage candidates, post jobs, and track
            applications.
          </p>
          <div className="emp-features">
            <div className="emp-feature">
              <span>📌</span>
              <p>Post unlimited job listings</p>
            </div>
            <div className="emp-feature">
              <span>🔍</span>
              <p>Access top talent pool</p>
            </div>
            <div className="emp-feature">
              <span>📊</span>
              <p>Advanced analytics dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="emp-form-section">
        <div className="emp-form-wrapper">
          <h2>Sign in to your account</h2>
          <p className="emp-form-subtitle">
            Don't have an account?{' '}
            <Link to="/register" className="emp-switch-link">
              Sign up
            </Link>
          </p>

          <div className="emp-social-auth">
            {/* <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="300"
              text="signin_with"
            /> */}
            google login
          </div>

          <div className="emp-divider">
            <span>OR</span>
          </div>

          {showOtpVerification ? (
            <OtpVerification 
              email={formData.email}
              onComplete={() => setShowOtpVerification(false)}
              cooldown={45}
            />
          ) : (
            <form className="emp-form" onSubmit={handleSubmit}>
              <div className="emp-form-group">
                <label htmlFor="email" className="emp-label">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`emp-input ${errors.email ? 'emp-input-error' : ''}`}
                  placeholder="your@company.com"
                />
                {errors.email && (
                  <span className="emp-error">{errors.email}</span>
                )}
              </div>

              <div className="emp-form-group">
                <label htmlFor="password" className="emp-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`emp-input ${errors.password ? 'emp-input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span className="emp-error">{errors.password}</span>
                )}
              </div>

              <div className="emp-options">
                <div className="emp-remember">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="emp-checkbox"
                  />
                  <label htmlFor="rememberMe" className="emp-remember-label">
                    Remember me
                  </label>
                </div>
                <button type="button" className="emp-forgot-btn">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="emp-primary-btn">
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EmpLogin;