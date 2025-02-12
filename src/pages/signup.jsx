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
  
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    email: '',
    password: '',
    confirmPassword: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        alert('Usuario criado!!');
        history.push('/');
      } else if (response.status === 422 || response.status === 409) {
        const errorData = await response.text();
        alert(errorData);
      } else {
        alert('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <div>
      <Header />
      <SignupArea>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

