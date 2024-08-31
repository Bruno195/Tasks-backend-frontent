import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  text-align: center;
  margin-bottom: 15px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Limpa a mensagem de erro antes de tentar o login
   
      const response = await api.post('auth/login', { email, password });
      console.log(response);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/projects'); 
      } else if (response && response.data.statusCode === 401) {
        setError('Invalid credentials, email or password.');
      } else {
        setError('An error occurred. Please check your connection and try again.');
      }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </Container>
  );
};

export default LoginPage;
