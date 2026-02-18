// create-app-fixed.js
const fs = require('fs');
const path = require('path');

// Project structure
const projectStructure = {
  'package.json': `{
  "name": "first-securities-trading-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/react-router-dom": "^5.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "@types/node": "^20.4.0",
    "react-scripts": "5.0.1",
    "typescript": "^5.1.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0D224C',
        'accent-gold': '#FFC72C',
        'light-blue': '#D8E0F0',
      },
      fontFamily: {
        'sfpro': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`,

  'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}`,

  'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#0D224C" />
    <meta name="description" content="First Securities Trading App - Secure mobile trading platform" />
    <title>First Securities Trading</title>
    <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/sf-pro-display">
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>`,

  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
};

// Create directories
const directories = [
  'src',
  'src/components',
  'src/services',
  'src/styles',
  'src/hooks',
  'src/context',
  'src/utils',
  'public',
];

// Create files function
function createFiles(basePath, structure) {
  for (const [filePath, content] of Object.entries(structure)) {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created: ${filePath}`);
  }
}

// Create all files
console.log('🚀 Creating First Securities Trading App...\n');

// Create directories first
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Create root files
createFiles('.', projectStructure);

// Create a simplified version with just the essential files first
// Let's start with the minimal working version

const essentialFiles = {
  'src/App.tsx': `import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/globals.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <WelcomeScreen /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;`,

  'src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  'src/styles/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary-blue: #0D224C;
    --accent-gold: #FFC72C;
    --light-blue: #D8E0F0;
  }

  body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    @apply bg-gray-50;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    max-width: 420px;
    margin: 0 auto;
    background-color: white;
    min-height: 100vh;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow-x: hidden;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-blue text-white font-semibold py-4 px-6 rounded-xl 
           transition-all duration-200 hover:bg-opacity-90 active:scale-95
           focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply bg-white text-primary-blue font-semibold py-4 px-6 rounded-xl 
           border-2 border-primary-blue transition-all duration-200 
           hover:bg-primary-blue hover:text-white active:scale-95
           focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50;
  }

  .card-shadow {
    @apply shadow-md hover:shadow-lg transition-shadow duration-200;
  }

  .input-field {
    @apply w-full p-4 border border-gray-200 rounded-xl focus:border-blue-400 
           focus:ring-1 focus:ring-blue-400 outline-none transition duration-200
           disabled:bg-gray-100 disabled:cursor-not-allowed;
  }

  .nav-active {
    @apply text-primary-blue;
  }

  .notification-dot {
    @apply absolute top-2 right-2 w-2 h-2 bg-accent-gold rounded-full;
  }

  .status-badge {
    @apply px-2 py-1 rounded-full text-xs font-semibold;
  }

  .status-pending {
    @apply bg-yellow-100 text-yellow-800;
  }

  .status-approved {
    @apply bg-green-100 text-green-800;
  }

  .status-rejected {
    @apply bg-red-100 text-red-800;
  }

  .status-review {
    @apply bg-blue-100 text-blue-800;
  }
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--light-blue);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}`,

  'src/context/AuthContext.tsx': `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('firstSecuritiesUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('firstSecuritiesUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('firstSecuritiesUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('firstSecuritiesUser');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};`,

  'src/services/apiService.ts': `// API Service Layer
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.first-securities.com';

interface LoginCredentials {
  customerId: string;
  password: string;
  brokerCode: string;
}

class ApiService {
  private getHeaders(): HeadersInit {
    const user = JSON.parse(localStorage.getItem('firstSecuritiesUser') || '{}');
    const token = user?.token ? 'Bearer ' + user.token : '';
    return {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
  }

  async login(credentials: LoginCredentials) {
    // Mock implementation - in production, this would call the real API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.customerId && credentials.password) {
          resolve({
            id: credentials.customerId,
            name: 'Demo User',
            email: 'user@example.com',
            token: 'mock-jwt-token-' + Date.now()
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async logout() {
    localStorage.removeItem('firstSecuritiesUser');
  }

  async getPortfolioSummary(customerId: string) {
    return {
      totalValue: 9875450.50,
      todaysGain: 330000,
      gainPercentage: 3.45,
      cashBalance: 85000.00,
      marginAvailable: 250000.00
    };
  }
}

export default new ApiService();`,

  'src/components/SplashScreen.tsx': `import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-white">
      <div className="text-4xl font-extrabold text-white bg-white rounded-full p-4 shadow-lg animate-pulse">
        <img 
          src="https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png" 
          alt="First Securities Logo" 
          className="w-16 h-16"
        />
      </div>
      <h1 className="text-3xl font-bold mt-8 text-primary-blue">First Securities</h1>
      <p className="text-gray-500 mt-2">Brokers</p>
      <div className="absolute bottom-10 flex flex-col items-center">
        <div className="w-24 h-1 bg-gray-200 rounded-full mb-2">
          <div className="h-1 bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="text-sm text-gray-400">Loading Secure Trading Environment...</p>
      </div>
    </div>
  );
};

export default SplashScreen;`,

  'src/components/WelcomeScreen.tsx': `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';

const WelcomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    customerId: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await apiService.login({
        customerId: formData.customerId,
        password: formData.password,
        brokerCode: 'FIRST_SECURITIES'
      });
      
      login(userData as any);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen pt-12 p-6 bg-white">
      <header className="text-center mb-8">
        <img 
          src="https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png" 
          alt="First Securities Logo" 
          className="mx-auto mb-4 w-24 h-24"
        />
        <h1 className="text-3xl font-bold text-primary-blue">Welcome to FSEC</h1>
        <p className="text-gray-500">Sign in to manage your securities.</p>
      </header>

      <div className="flex justify-center space-x-8 mb-8">
        <button
          onClick={() => setActiveTab('login')}
          className={\`text-xl font-bold pb-2 border-b-4 transition-colors \${activeTab === 'login' ? 'text-primary-blue border-primary-blue' : 'text-gray-400 border-transparent'}\`}
        >
          Log In
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={\`text-xl font-bold pb-2 border-b-2 transition-colors \${activeTab === 'register' ? 'text-primary-blue border-primary-blue' : 'text-gray-400 border-transparent'}\`}
        >
          Register
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="font-bold mb-2 text-yellow-800">Risk Disclaimer:</p>
        <p className="text-yellow-700 text-sm">
          Trading involves substantial risk of loss and is not suitable for every investor. 
          Clients may lose more than their original investment. Past performance is not indicative of future results.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {activeTab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="customerId"
              placeholder="Enter Customer ID"
              value={formData.customerId}
              onChange={handleInputChange}
              className="input-field"
              required
              disabled={loading}
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-gray-400 flex items-center space-x-1"
                disabled={loading}
              >
                <span className="text-xs">Use Biometric</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="text-center text-sm mt-6 space-y-3">
            <p className="text-gray-500">Problems with login?</p>
            <div className="flex justify-around items-center">
              <button
                type="button"
                className="flex items-center space-x-1 text-gray-600"
                disabled={loading}
              >
                <span className="text-sm">Forgot Password</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-1 text-gray-600"
                disabled={loading}
              >
                <span className="text-sm">Forgot ID</span>
              </button>
            </div>
            <div className="pt-4 space-x-6">
              <a href="#" className="text-xs text-primary-blue">Privacy Policy</a>
              <a href="#" className="text-xs text-primary-blue">Contact Us</a>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-primary-blue">Customer Registration</h2>
          <p className="text-gray-600 mb-6">
            New customer registration requires KYC verification. Please visit our office or contact customer support.
          </p>
          <button
            onClick={() => alert('Please contact customer support for registration')}
            className="btn-secondary w-full"
          >
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;`,

  'src/components/Dashboard.tsx': `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';

interface PortfolioData {
  totalValue: number;
  todaysGain: number;
  gainPercentage: number;
  cashBalance: number;
  marginAvailable: number;
}

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await apiService.getPortfolioSummary(user?.id || '');
      setPortfolio(data as PortfolioData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-primary-blue">Welcome, {user?.name || 'Investor'}</h1>
            <p className="text-xs text-gray-500">Last login: Today, 09:45 AM</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="p-6 rounded-xl card-shadow bg-primary-blue text-white">
          <p className="text-sm opacity-80">Total Portfolio Value</p>
          <h2 className="text-4xl font-bold mt-1">
            ₦{portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center mt-2 space-x-4">
            <div>
              <p className="text-sm opacity-80">Today's Gain</p>
              <p className="text-lg font-bold text-green-300">
                +₦{portfolio.todaysGain.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="h-8 w-px bg-white opacity-30"></div>
            <div>
              <p className="text-sm opacity-80">Percentage</p>
              <p className="text-lg font-bold text-green-300">
                +{portfolio.gainPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl card-shadow bg-white">
            <p className="text-sm text-gray-500">Cash Balance</p>
            <h3 className="text-2xl font-bold mt-1 text-primary-blue">
              ₦{portfolio.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <button 
              onClick={() => alert('Funding feature coming soon')}
              className="mt-2 text-sm text-blue-500 hover:text-blue-600"
            >
              Add Funds →
            </button>
          </div>
          <div className="p-4 rounded-xl card-shadow bg-white">
            <p className="text-sm text-gray-500">Margin Available</p>
            <h3 className="text-2xl font-bold mt-1 text-primary-blue">
              ₦{portfolio.marginAvailable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <button 
              onClick={() => alert('Trading feature coming soon')}
              className="mt-2 text-sm text-blue-500 hover:text-blue-600"
            >
              Trade Now →
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => alert('Market feature coming soon')}
              className="p-4 rounded-xl bg-white card-shadow hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Market Watch</p>
                  <p className="text-sm text-gray-500">View stock prices</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => alert('Portfolio feature coming soon')}
              className="p-4 rounded-xl bg-white card-shadow hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Portfolio</p>
                  <p className="text-sm text-gray-500">View holdings</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl card-shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
            <button 
              onClick={() => alert('Reporting feature coming soon')}
              className="text-sm text-primary-blue hover:text-blue-600"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium">MTNN</p>
                <p className="text-sm text-gray-500">Buy • 2 hours ago</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+200 shares</p>
                <p className="text-sm text-gray-500">₦9,870,000.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium">ZENITHBANK</p>
                <p className="text-sm text-gray-500">Sell • 5 hours ago</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">-150 shares</p>
                <p className="text-sm text-gray-500">₦4,500,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;`
};

// Create essential files first
createFiles('.', essentialFiles);

console.log('\n✅ Created essential files successfully!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm start');
console.log('\n🚀 Your minimal trading app is ready to launch!');
console.log('\nYou can now add more components one by one as needed.');