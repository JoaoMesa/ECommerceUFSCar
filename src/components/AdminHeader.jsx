// components/AdminHeader.jsx
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { getItem, setItem } from "../services/LocalStorageFuncs";

const AdminHeaderArea = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  background-color: purple;
  padding: 20px;
  margin-bottom: 70px;

  .logo-title {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  h1 {
    color: white;
    margin: 0;
  }

  nav {
    display: flex;
    gap: 30px;
    align-items: center;
  h2 {
	color: white;
	font-weight: bold;
	margin: 0;
  }
  }

  .admin-buttons {
    display: flex;
    gap: 20px;

    button {
      background: none;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        text-decoration: underline;
      }
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  a, div {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }
  a:hover, div:hover {
    background-color: #ddd;
  }
`;

export const AdminHeader = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = getItem("loggedUser");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("authToken");
    setLoggedUser(null);
    history.push("/");
  };

  return (
    <AdminHeaderArea>
      <div className="logo-title">
        <h1>Admin Dashboard</h1>
        <img
          src="https://www.dche.ufscar.br/pt-br/assets/imagens/logo-ufscar.png/@@images/image.png"
          alt="Logo"
          style={{ width: "110px", height: "70px" }}
        />
      </div>

      <nav>
	  <Dropdown>
          <h2 onClick={() => setDropdownVisible(!dropdownVisible)}>
            Perfil
          </h2>
          <DropdownContent show={dropdownVisible}>
            <div onClick={handleLogout}>Logout</div>
          </DropdownContent>
        </Dropdown>

        <div className="admin-buttons">
          <button onClick={() => history.push("/admin/")}>
            Produtos
          </button>
          <button onClick={() => history.push("/admin/orders")}>
            Pedidos
          </button>
        </div>
        
        
      </nav>
    </AdminHeaderArea>
  );
};
