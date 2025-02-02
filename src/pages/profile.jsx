// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Header } from '../components/Header';
import styled from 'styled-components';

const ProfileArea = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 2px solid purple;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    text-align: center;
    color: purple;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #333;
  }

  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: purple;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: darkmagenta;
  }
`;

const PurchaseList = styled.div`
  margin-top: 30px;
  h3 {
    color: purple;
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
  }
`;

export const Profile = () => {
  // State to store profile info
  const [profileData, setProfileData] = useState({
    username: '',
    password: '',
    // Optionally include email if needed; here we omit it as per your login update.
    purchases: []
  });

  useEffect(() => {
    const loggedUser = getItem('loggedUser');
    if (loggedUser) {
      setProfileData({
        username: loggedUser.username,
        password: loggedUser.password || '',
        purchases: loggedUser.purchases || []
      });
    }
  }, []);

  // Update state on form change
  const handleChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  // Handle profile update submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated profile
    const updatedUser = { ...profileData };
    setItem('loggedUser', updatedUser);
    setItem('userProfile', updatedUser);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div>
      <Header />
      <ProfileArea>
        <h2>Meu Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
        {/* Purchase History */}
        <PurchaseList>
          <h3>Histórico de Compras</h3>
          {profileData.purchases && profileData.purchases.length > 0 ? (
            <ul>
              {profileData.purchases.map((item, index) => (
                <li key={`${item.id}-${index}`}>
                  {item.title} - R$ {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: 'center' }}>Nenhuma compra realizada ainda.</p>
          )}
        </PurchaseList>
      </ProfileArea>
    </div>
  );
};
