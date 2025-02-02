// pages/Login.jsx
import React, { useState } from 'react';
import { setItem, getItem } from '../services/LocalStorageFuncs';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import styled from 'styled-components';

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
  }

  input {
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background-color: purple;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for admin login with "root" as both username and password
    if (formData.username === 'root' && formData.password === 'root') {
      const adminUser = { username: 'root', role: 'admin' };
      setItem('loggedUser', adminUser);
      alert('Logged in as admin');
      history.push('/');
      return;
    }

    // Otherwise, check the stored signup data (which should use username and password)
    const storedUser = getItem('userProfile');
    if (
      storedUser &&
      storedUser.username === formData.username &&
      storedUser.password === formData.password
    ) {
      setItem('loggedUser', storedUser);
      alert('Logged in successfully');
      history.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <Header />
      <LoginArea>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </LoginArea>
    </div>
  );
};
