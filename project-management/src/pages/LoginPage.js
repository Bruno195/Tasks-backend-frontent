import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/projects');
  };

  return (
    <div >
      
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
