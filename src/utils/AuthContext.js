import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    } else {
      localStorage.removeItem('apiKey');
    }
  }, [apiKey]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  const login = (token, apiKey, email) => {
    setToken(token);
    setApiKey(apiKey);
    setUserEmail(email);
  };

  const logout = () => {
    setToken(null);
    setApiKey(null);
    setUserEmail(null);
  };

  const updateApiKey = (newApiKey) => {
    setApiKey(newApiKey);
  };

  const value = {
    token,
    apiKey,
    userEmail,
    login,
    logout,
    updateApiKey,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};