// pages/Signup.jsx
import React, { useState } from 'react';
import { setItem } from '../services/LocalStorageFuncs';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import styled from 'styled-components';

const SignupArea = styled.div`
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

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the new user profile with a default role of 'user'
    const newUser = { ...formData, role: 'user' };
    setItem('userProfile', newUser);
    // Automatically log in the new user:
    setItem('loggedUser', newUser);
    alert('Profile created and logged in!');
    history.push('/');
  };

  return (
    <div>
      <Header />
      <SignupArea>
        <h2>Sign Up</h2>
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
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
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
          <button type="submit">Sign Up</button>
        </form>
      </SignupArea>
    </div>
  );
};
