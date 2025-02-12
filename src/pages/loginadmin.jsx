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

export const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signin/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });


	console.log(response);
      if (response.status === 200) {
	  const data = await response.json();
	  console.log(data);  // Verifique o que o backend está retornando

	  setItem('authToken', data.token);  
	  setItem('loggedUser', true); // Salva o estado de login como "true"

	  alert('Login realizado com sucesso');
	  history.push('/admin');
	}
	else if (response.status === 401) {
        alert('Email ou senha incorretos');
      } else if (response.status === 422){
      	alert('Formato de email ou senha inapropriados')
      } else {
        alert('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <div>
      <Header />
      <LoginArea>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
	  <button type="button" onClick={() => history.push('/login')}>
  Login como Usuário
</button>

        </form>
      </LoginArea>
    </div>
  );
};
