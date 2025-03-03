import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Logo from '/assets/images/logo.png';

function Login() {
  return (
    <div className="parentDiv"> 
      <img src={Logo} width={300} height={300} alt="Logo" className='logo auth-logo' /> {/* Añadimos la clase auth-logo */}
      <h1>Welcome Back</h1>
      <p>Sign in to continue tracking your habits and achieving your goals</p>
      <form className="form-container">
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <div className='button-container'>
          <Button onClick={() => alert('Botón de Login clickado!')} label='Login'>Login</Button>
        </div>
      </form>
      <Footer/>
    </div>
  );
}

export default Login;