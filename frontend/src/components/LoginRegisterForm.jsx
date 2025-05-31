import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/${mode}`;
    const payload = { username, password };

    try {
      const response = await axios.post(url, payload);

      if (mode === 'login') {
        setResponseMsg('Login successful');
        localStorage.setItem('token', response.data); // Save JWT
        navigate('/search'); // ⬅ Redirect to SearchEmployee page
      } else {
        setResponseMsg('Registration successful');
      }
    } catch (error) {
      console.error(error);
      setResponseMsg(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">{mode === 'login' ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="mt-3 text-center">
        <button
          className="btn btn-link"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          Switch to {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
      {responseMsg && <div className="alert alert-info mt-3">{responseMsg}</div>}
    </div>
  );
}
