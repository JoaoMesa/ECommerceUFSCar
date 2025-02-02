// pages/Admin.jsx
import React from 'react';
import { Header } from '../components/Header';
import styled from 'styled-components';

const AdminArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h2 {
    color: purple;
  }
`;

export const Admin = () => {
  return (
    <div>
      <Header />
      <AdminArea>
        <h2>Admin Page</h2>
        <p>This is a blank admin page for now.</p>
      </AdminArea>
    </div>
  );
};
