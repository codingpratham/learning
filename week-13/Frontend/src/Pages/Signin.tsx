import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8787/api/v1/user/signin", {
        email,
        password,
      });

      const { message, user } = res.data;

      if (message === "Successfully signed in") {
        alert("Welcome back!");
        setEmail('');
        setPassword('');
        navigate('/blog');
      } else {
        alert(message || "An unexpected response was received.");
      }

      console.log("User signed in successfully:", user);
    } catch (error) {
      console.error("Error during sign-in:", error);

      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) || "An error occurred during sign-in. Please try again.";
      alert(errorMessage);
    }
  };


  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Sign In Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
            <p className="text-gray-500">
              Don't have an account?{' '}
              <a href="/signup" className="text-gray-900 underline underline-offset-4">
                Sign up
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Testimonial */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md space-y-4">
          <blockquote className="text-2xl font-medium">
            "This platform has streamlined our workflow and increased our productivity tenfold. It's an essential tool for our team."
          </blockquote>
          <div>
            <div className="font-medium">Sarah Connor</div>
            <div className="text-gray-500">CTO, Cyberdyne Systems</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
