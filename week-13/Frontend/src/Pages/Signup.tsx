import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8787/api/v1/user/signup", {
        name,
        email,
        password,
      });

      const { message, user } = res.data;

      console.log("User signed up successfully:", user);

      if (message === "Successfully registered") {
        alert("User signed up successfully");
        setName(''); // Clear the form fields
        setEmail('');
        setPassword('');
        navigate('/blog'); // Navigate to the blog page
      } else {
        alert(message || "An unexpected response was received.");
      }
    } catch (error) {
      console.error("Error during signup:", error);

    }
  };

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Sign Up Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-gray-500">
              Already have an account?{' '}
              <a href="/signin" className="text-gray-900 underline underline-offset-4">
                Login
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                aria-required="true"
              />
            </div>

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
                aria-required="true"
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
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Testimonial */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md space-y-4">
          <blockquote className="text-2xl font-medium">
            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          </blockquote>
          <div>
            <div className="font-medium">Jules Winnfield</div>
            <div className="text-gray-500">CEO, Acme Inc</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
