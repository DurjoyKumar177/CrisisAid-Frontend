import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../Components/common/Loader';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('GitHub login failed. Please try again.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token) {
      // Save token and redirect to home
      login(token);
      navigate('/');
    } else {
      setError('No token received. Please try again.');
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        {error ? (
          <>
            <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
            <p className="text-gray-500">Redirecting to login...</p>
          </>
        ) : (
          <>
            <Loader size="lg" />
            <p className="mt-4 text-gray-600">Completing login...</p>
          </>
        )}
      </div>
    </div>
  );
}