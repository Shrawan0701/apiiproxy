import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h2>Unlock API Power with Smart Limits</h2>
          <p className="hero-subtitle">
             Generate your free key in seconds, proxy any request,
             and unlock detailed dashboard.
            </p>


          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-large">
              Go to Dashboard
            </Link>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started Free
              </Link>

            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>Key Features</h3>
          <div className="features-grid">
            <div className="feature-card">

              <h3>API Key Management</h3>
              <p>Get your unique API key and manage access to external APIs through our secure proxy.</p>
            </div>

            <div className="feature-card">

              <h3>Rate Limiting</h3>
              <p>Automatic rate limiting with 1000 requests per day. Monitor your usage in real-time.</p>
            </div>

            <div className="feature-card">

              <h3>Analytics Dashboard</h3>
              <p>View detailed statistics including response times, error rates, and usage history.</p>
            </div>

            <div className="feature-card">

              <h3>API Playground</h3>
              <p>Test external APIs directly from our interface with JSON response preview.</p>
            </div>

            <div className="feature-card">

              <h3>Secure Proxy</h3>
              <p>All requests are securely proxied through our servers with full request logging.</p>
            </div>

            <div className="feature-card">

              <h3>Real-time Monitoring</h3>
              <p>Track performance metrics and get insights into your API usage patterns.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Landing;