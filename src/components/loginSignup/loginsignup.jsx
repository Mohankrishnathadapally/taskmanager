import React, { useState } from 'react';
import './loginsignup.css';
import { IconMail, IconLock, IconUserPlus } from "@tabler/icons-react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login or signup logic here
  };

  return (
    <div className='login-signup-container'>
      <div className="form-container">
        <form className='signup-form' onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          {!isLogin && (
            <div className="input-container">
              <IconUserPlus />
              <input type="text" placeholder="Username" required />
            </div>
          )}
          <div className="input-container">
            <IconMail />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-container">
            <IconLock />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="button-submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          <div className='click-here'>
          {isLogin ? (
            <p>
              Create a new account? <span onClick={handleToggleMode}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={handleToggleMode}>Click here</span>
            </p>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
