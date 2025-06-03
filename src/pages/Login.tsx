import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Logo from '/assets/images/logo.png';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      login(response.data);
      navigate('/home');
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Error while logging in");
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className="parentDiv"> 
      <img src={Logo} width={300} height={300} alt="Logo" className='logo auth-logo' />
      <h1>Welcome Back</h1>
      <p>Sign in to continue tracking your habits and achieving your goals</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Username"
          className="input-field" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='username'
          autoFocus
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          required
        />
        <div className='button-container'>
          <Button type='submit' className='primary-button' label='Login'/>
        </div>
        <p className='text-red-500'>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
      <Footer/>
    </div>
  );
}

export default Login;