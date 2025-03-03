import React from 'react';
import Footer from '../components/Footer';
import Logo from '/assets/images/logo.png';
import RedirectButton from '../components/RedirectButton';

function Welcome() {
  return (
    <div className="parentDiv"> 
      <img src={Logo} width={300} height={300} alt="Logo" className='logo' />
      <h1>Small Actions, Big Changes</h1>
      <p>Track your progress effortlessly and stay on top of your goals</p>
      <div className='button-container'>
        <RedirectButton label='Get started' direction='/register'/>
        <RedirectButton label='Login' direction='/login'/>
      </div>
      <Footer/>
    </div>
  );
}

export default Welcome;