import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Logo from '/assets/images/logo.png';

function Register() {
  return (
    <div className="parentDiv"> 
      <img src={Logo} width={300} height={300} alt="Logo" className='logo auth-logo' />
      <h1 className='text-red-500'>Create Your Account</h1>
      <p className='text-red-500'>Join us to start tracking your habits and achieving your goals</p>
      <form className="form-container">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <input type="password" placeholder="Confirm Password" className="input-field" />
        <div className='button-container'>
          <Button onClick={() => alert('Botón de Register clickado!')} label='Register'>Register</Button>
        </div>
      </form>
      <Footer/>
    </div>
  );
}

export default Register;