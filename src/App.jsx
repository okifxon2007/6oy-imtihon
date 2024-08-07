import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Error from './pages/error';
import Login from './pages/login';
import Register from './pages/register';
import Premium from './pages/premium'

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('accesstoken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/' element={
          <ProRoute token={token}>
            <Home />
          </ProRoute>
        } />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

function ProRoute({ token, children }) {
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }
  return children;
}

export default App;