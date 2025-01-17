import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    setLoading(true); // Set loading state
    setMessage(''); // Clear previous messages
  
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password
      });
  
      const data = response.data;
      console.log(data);
  
      // Check if the response contains a token, indicating success
      if (data.token) {
        setMessage('Successfully registered');
        navigate('/home'); // Navigate to the home page
      } else {
        setMessage('Failed to register: ' + (data.msg || 'Unknown error'));
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific error from axios
        if (error.response) {
          // The server responded with a status other than 2xx
          setMessage('Failed to register: ' + (error.response.data.msg || 'Unknown error'));
        } else {
          setMessage('Network error');
        }
      } else {
        setMessage('An unknown error occurred');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
