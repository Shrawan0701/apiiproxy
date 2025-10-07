import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { proxyService } from '../services/api';

const ApiPlayground = () => {
  const [request, setRequest] = useState({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    headers: '{}',
    body: '',
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { apiKey } = useAuth();

  const handleInputChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const sendRequest = async () => {
    if (!request.url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      let headers = null;
      if (request.headers && request.headers.trim()) {
        try {
          headers = JSON.parse(request.headers);
        } catch (e) {
          throw new Error('Invalid JSON in headers');
        }
      }

      const result = await proxyService.makeRequest(
        apiKey,
        request.url,
        request.method,
        request.body || null,
        headers
      );

      setResponse(result.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Request failed');
      if (err.response?.data) {
        setResponse(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
    setError('');
  };

  const loadExample = (example) => {
    const examples = {
      jsonplaceholder: {
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
        headers: '{}',
        body: '',
      },
      httpbin_get: {
        url: 'https://httpbin.org/get',
        method: 'GET',
        headers: '{"User-Agent": "API-Limiter-Platform"}',
        body: '',
      },
      httpbin_post: {
        url: 'https://httpbin.org/post',
        method: 'POST',
        headers: '{"Content-Type": "application/json"}',
        body: '{"message": "Hello from API Playground!", "timestamp": "' + new Date().toISOString() + '"}',
      },
    };

    if (examples[example]) {
      setRequest(examples[example]);
      clearResponse();
    }
  };

  return (
    <div className="api-playground">
      <div className="playground-header">
        <h1>API Playground</h1>
        <p>Test external APIs through our proxy with automatic rate limiting</p>
      </div>

      <div className="playground-content">
        <div className="request-section">
          <div className="card">
            <div className="card-header">
              <h3>Request Configuration</h3>
              <div className="examples">
                <label>Quick Examples:</label>
                <button 
                  onClick={() => loadExample('jsonplaceholder')} 
                  className="btn btn-small"
                >
                  JSONPlaceholder
                </button>
                <button 
                  onClick={() => loadExample('httpbin_get')} 
                  className="btn btn-small"
                >
                  HTTPBin GET
                </button>
                <button 
                  onClick={() => loadExample('httpbin_post')} 
                  className="btn btn-small"
                >
                  HTTPBin POST
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="url">URL (Enter your API URL here) *</label>
              <input
                type="url"
                id="url"
                name="url"
                value={request.url}
                onChange={handleInputChange}
                placeholder="https://api.example.com/endpoint"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="method">Method</label>
              <select
                id="method"
                name="method"
                value={request.method}
                onChange={handleInputChange}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="headers">Headers (JSON)</label>
              <textarea
                id="headers"
                name="headers"
                value={request.headers}
                onChange={handleInputChange}
                placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                rows="3"
              />
            </div>

            {(request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') && (
              <div className="form-group">
                <label htmlFor="body">Request Body</label>
                <textarea
                  id="body"
                  name="body"
                  value={request.body}
                  onChange={handleInputChange}
                  placeholder='{"key": "value"}'
                  rows="4"
                />
              </div>
            )}

            <div className="request-actions">
              <button 
                onClick={sendRequest}
                className="btn btn-primary"
                disabled={loading || !request.url}
              >
                {loading ? 'Sending Request...' : 'Send Request'}
              </button>
              <button 
                onClick={clearResponse}
                className="btn btn-outline"
              >
                Clear Response
              </button>
            </div>
          </div>
        </div>

        <div className="response-section">
          <div className="card">
            <h3>Response</h3>

            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            )}

            {response && (
              <div className="response-content">
                <div className="response-meta">
                  <div className="response-status">
                    <span className="label">Status:</span>
                    <span className={`status-code ${response.statusCode >= 400 ? 'error' : 'success'}`}>
                      {response.statusCode}
                    </span>
                  </div>
                  <div className="response-timing">
                    <span className="label">Response Time:</span>
                    <span className="timing">{response.latency}ms</span>
                  </div>
                  <div className="response-quota">
                    <span className="label">Remaining Quota:</span>
                    <span className="quota">{response.remainingQuota}</span>
                  </div>
                </div>

                <div className="response-body">
                  <h4>Response Body</h4>
                  <pre className="json-response">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {!response && !error && !loading && (
              <div className="no-response">
                <p>Send a request to see the response here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="api-info">
        <div className="card">
          <h3>How to Use</h3>
          <ol>
            <li>Enter the URL of the API endpoint you want to test</li>
            <li>Select the HTTP method (GET, POST, etc.)</li>
            <li>Add any headers in JSON format if needed</li>
            <li>Add request body for POST/PUT requests</li>
            <li>Click "Send Request" to make the API call through our proxy</li>
          </ol>

          <div className="code-example">
            <h4>Using your API key directly:</h4>
            <pre>
{`curl -X POST https://apiproxy-zeak.onrender.com/api/proxy \
  -H "X-API-Key: ${apiKey}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://jsonplaceholder.typicode.com/posts/1", "method": "GET"}'`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;