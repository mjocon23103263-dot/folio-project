import React, { useState } from 'react';
import '../App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    if (!formData.category) {
      newErrors.category = 'Interest category is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        alert("You're registered! 🎉 Welcome to Cycling Adventures!");
        setFormData({
          fullname: '',
          username: '',
          email: '',
          dob: '',
          password: '',
          confirmPassword: '',
          gender: '',
          terms: false,
          category: ''
        });
      }, 1500);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="register-page">
      <main className="main">
        <section className="register-section">
          <div className="register-content">
            <h1>Sign Up for Cycling Updates</h1>
            <p>Register to receive newsletters with tips, event invites, and gear recommendations.</p>
            
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={errors.fullname ? 'error' : ''}
                />
                {errors.fullname && <span className="error">{errors.fullname}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="username">Preferred Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>

              <fieldset className="radio-group">
                <legend>Gender:</legend>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                  />
                  Other
                </label>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </fieldset>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  I agree to the terms and conditions.
                </label>
                {errors.terms && <span className="error">{errors.terms}</span>}
              </div>

              <fieldset className="radio-group">
                <legend>Interest Category:</legend>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value="beginner"
                    checked={formData.category === 'beginner'}
                    onChange={handleChange}
                  />
                  Beginner
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value="intermediate"
                    checked={formData.category === 'intermediate'}
                    onChange={handleChange}
                  />
                  Intermediate
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value="expert"
                    checked={formData.category === 'expert'}
                    onChange={handleChange}
                  />
                  Expert
                </label>
                {errors.category && <span className="error">{errors.category}</span>}
              </fieldset>

              <button type="submit" disabled={isSubmitting || isSuccess}>
                {isSubmitting ? 'Registering...' : isSuccess ? 'Registered! 🎉' : 'Submit'}
              </button>
            </form>
          </div>

          <div className="register-image">
            <img 
              src="/assets/register-cycling.jpg" 
              alt="Group of cyclists on road trip" 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;