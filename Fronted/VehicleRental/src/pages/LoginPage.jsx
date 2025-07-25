import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ userType = 'user' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const isAdmin = userType === 'admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const apiUrl = isAdmin
      ? 'http://localhost:8080/api/admin/login'
      : 'http://localhost:8080/api/user/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }

      const { token, id, email: userEmail, role } = await response.json();
      login({ id, email: userEmail, role }, token);

      // Redirect based on role or userType
      navigate(isAdmin ? '/admin' : '/');
    } catch (err) {
      setError(err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt="Login Visual"
            className="object-contain w-full max-h-96"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            {isAdmin ? 'Admin Login' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isAdmin
              ? 'Login to the admin panel.'
              : <>
                  Login to your account below. Don’t have an account?{' '}
                  <a href="/usersignup" className="text-blue-600 font-medium hover:underline">
                    Sign up
                  </a>
                </>
            }
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {!isAdmin && (
            <p className="text-xs text-center text-gray-500 mt-4">
              By logging in, you agree to our{' '}
              <a href="#" className="text-blue-600 underline">Terms</a> and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
