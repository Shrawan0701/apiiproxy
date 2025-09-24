import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { statsService, authService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyLoading, setKeyLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { apiKey, updateApiKey, userEmail } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await statsService.getUserStats();
      console.log('Dashboard stats response:', response);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load statistics:', err.response?.data || err.message);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    try {
      setKeyLoading(true);
      const response = await authService.generateKey();
      const newApiKey = (response.data).apiKey;
      updateApiKey(newApiKey);
    } catch (err) {
      setError('Failed to generate new API key');
    } finally {
      setKeyLoading(false);
    }
  };


  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">{error}</div>
        <button onClick={fetchStats} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  const chartData = stats?.history?.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    requests: item.requestCount,
    avgLatency: item.avgLatency,
    errorRate: item.errorRate,
  })) || [];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {userEmail}</p>
      </div>

      <div className="api-key-section">
        <div className="card">
          <h3>Your API Key</h3>
          <div className="api-key-display">
            <code>{apiKey}</code>
            <button onClick={copyApiKey} className="btn btn-small">Copy</button>
            <button
              onClick={generateNewKey}
              className="btn btn-outline btn-small"
              disabled={keyLoading}
            >
              {keyLoading ? 'Generating...' : 'Generate New'}
            </button>
          </div>
          <p className="api-key-info">
            Use this key in the 'X-API-Key' header when making requests to /api/proxy
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Requests</h3>
          <div className="stat-value">
            {stats.todayRequests} / {stats.quotaLimit}
          </div>
          <div className="stat-progress">
            <div
              className="stat-progress-bar"
              style={{ width: `${(stats.todayRequests / stats.quotaLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Total Requests</h3>
          <div className="stat-value">{stats.totalRequests.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <h3>Avg Response Time</h3>
          <div className="stat-value">{Math.round(stats.avgLatency)}ms</div>
        </div>

        <div className="stat-card">
          <h3>Error Rate</h3>
          <div className="stat-value">{stats.errorRate.toFixed(1)}%</div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="charts-section">
          <div className="chart-card">
            <h3>Daily Request Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Response Time Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgLatency"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="refresh-section">
        <button onClick={fetchStats} className="btn btn-outline">
          Refresh Data
        </button>
      </div>


      {copied && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
           API key copied!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
