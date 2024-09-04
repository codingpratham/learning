import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./Component/Pages/Dashboard'));
import Landing from './Component/Pages/Landing';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/dashboard' element={
            <Suspense>

              <Dashboard />
            </Suspense>
            } />
          <Route path='/landing' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate('/landing');
        }}
      >
        Landing
      </button>
      <button
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Dashboard
      </button>
    </div>
  );
}

export default App;
