import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OtpVerification from './OtpVerification';
import './style.css';
import Footer from '../../pages/components/Footer';
import Navbar from '../../pages/components/Navbar';


const EmpRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const navigate = useNavigate();

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = () => {
    if (!formData.password) return 0;
    
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    
    return (strength / 4) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOtpVerification(true);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google registration success:', credentialResponse);
    // Handle Google auth with your backend
    navigate('/login'); // Redirect after successful registration
  };

  const handleGoogleError = () => {
    console.log('Google registration failed');
  };

  return (
    <>
    <Navbar />
    <div className="emp-auth-container">
      <div className="emp-hero-section">
        <div className="emp-hero-content">
          <h1>Join Thousands of Employers</h1>
          <p>
            Create your employer account to access our full suite of recruitment
            tools and find the best talent for your organization.
          </p>
          <div className="emp-features">
            <div className="emp-feature">
              <span>🚀</span>
              <p>Fast candidate matching</p>
            </div>
            <div className="emp-feature">
              <span>🛠️</span>
              <p>Powerful hiring tools</p>
            </div>
            <div className="emp-feature">
              <span>📈</span>
              <p>Performance analytics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="emp-form-section">
        <div className="emp-form-wrapper">
          <h2>Create your employer account</h2>
          <p className="emp-form-subtitle">
            Already have an account?{' '}
            <Link to="/employer/login" className="emp-switch-link">
              Sign in
            </Link>
          </p>

          <div className="emp-social-auth">
            {/* <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="300"
              text="signup_with"
            /> */}
            google login
          </div>

          <div className="emp-divider">
            <span>OR</span>
          </div>

          {showOtpVerification ? (
            <OtpVerification 
              email={formData.email}
              onComplete={() => navigate('/employer/login')}
              cooldown={45}
            />
          ) : (
            <form className="emp-form" onSubmit={handleSubmit}>
              <div className="emp-form-group">
                <label htmlFor="companyName" className="emp-label">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`emp-input ${errors.companyName ? 'emp-input-error' : ''}`}
                  placeholder="Your company name"
                />
                {errors.companyName && (
                  <span className="emp-error">{errors.companyName}</span>
                )}
              </div>

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
                <label htmlFor="phone" className="emp-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`emp-input ${errors.phone ? 'emp-input-error' : ''}`}
                  placeholder="+1 (123) 456-7890"
                />
                {errors.phone && (
                  <span className="emp-error">{errors.phone}</span>
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
                <div className="emp-password-strength">
                  <div
                    className="emp-strength-meter"
                    style={{ width: `${calculatePasswordStrength()}%` }}
                  ></div>
                </div>
                <p className="emp-hint">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>

              <div className="emp-form-group">
                <label htmlFor="confirmPassword" className="emp-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`emp-input ${errors.confirmPassword ? 'emp-input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <span className="emp-error">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="emp-primary-btn">
                Create Account
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

export default EmpRegister;