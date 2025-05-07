'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import bankLogo from '../assets/bank-logo.svg'
import authImage from '../assets/auth-image.svg'
import './AuthForm.css'

const AuthForm = ({ type }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: '',
    accountType: 'savings'
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (type === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.ssn) newErrors.ssn = 'SSN is required'
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      if (type === 'signup') {
        const response = await authService.signUp(formData)
        if (response.user) {
          localStorage.setItem('userId', response.user._id)
          navigate('/')
        }
      } else {
        const response = await authService.signIn({
          email: formData.email,
          password: formData.password
        })
        if (response.user) {
          localStorage.setItem('userId', response.user._id)
          navigate('/')
        }
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form">
          <div className="logo-container">
            <img src={bankLogo} alt="Bank Logo" className="bank-logo" />
            <h1 className="bank-title">Banking System</h1>
          </div>
          
          <div className="form-header">
            <h2>{type === 'signup' ? 'Create Account' : 'Sign In'}</h2>
            <p className="form-subtitle">
              {type === 'signup' ? 'Please enter your details.' : 'Welcome back!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {type === 'signup' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="ex: Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your specific address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="ex: NY"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      placeholder="ex: 11101"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="yyyy-mm-dd"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ssn">SSN</label>
                    <input
                      type="text"
                      id="ssn"
                      name="ssn"
                      placeholder="ex: 1234"
                      value={formData.ssn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Processing...' : type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            {type === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => navigate(type === 'signin' ? '/signup' : '/signin')}
              className="switch-link"
            >
              {type === 'signin' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      <div className="auth-image">
        <img src={authImage} alt="Banking System" />
      </div>
    </div>
  )
}

export default AuthForm