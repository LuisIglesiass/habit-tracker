import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/assets/images/logo.png';
import Button from '../components/Button';
import Footer from '../components/Footer';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (username.trim().length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (including . and -).");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Error while registering user");
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className="parentDiv"> 
      <img src={Logo} width={300} height={300} alt="Logo" className='logo auth-logo' />
      <h1 className='text-red-500'>Create Your Account</h1>
      <p className='text-red-500'>Join us to start tracking your habits and achieving your goals</p>
      <form className="form-container" onSubmit={handleRegister}>
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
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="input-field" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='confirm-password'
          required
        />
        <div className='button-container'>
          <Button className='primary-button' type="submit" label='Register'/>
        </div>
        <p className='text-red-500'>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      <Footer/>
    </div>
  );
}

export default Register;