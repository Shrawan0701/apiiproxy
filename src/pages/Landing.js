import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h1>API Limiter & Monitoring Platform</h1>
          <p className="hero-subtitle">
            Rate limit, monitor, and analyze your API requests with ease
          </p>
          <p className="hero-description">
            Get your API key, make requests through our proxy, and view detailed 
            analytics with automatic rate limiting built in.
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
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3>API Key Management</h3>
              <p>Get your unique API key and manage access to external APIs through our secure proxy.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rate Limiting</h3>
              <p>Automatic rate limiting with 1000 requests per day. Monitor your usage in real-time.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>View detailed statistics including response times, error rates, and usage history.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛝</div>
              <h3>API Playground</h3>
              <p>Test external APIs directly from our interface with JSON response preview.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Proxy</h3>
              <p>All requests are securely proxied through our servers with full request logging.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Real-time Monitoring</h3>
              <p>Track performance metrics and get insights into your API usage patterns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up & Get API Key</h3>
              <p>Create your account and receive a unique API key for making requests.</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Make Requests via Proxy</h3>
              <p>Send requests to external APIs through our /proxy endpoint with rate limiting.</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Monitor & Analyze</h3>
              <p>View your usage statistics, response times, and error rates in the dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;