// components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { getItem, setItem } from "../services/LocalStorageFuncs";

const HeaderArea = styled.header`
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
    gap: 20px;
    align-items: center;
  }

  a, h2 {
    text-decoration: none;
    color: white;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
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

export const Header = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = getItem("loggedUser");
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  const handleLogout = () => {
    setItem("loggedUser", null);
    setLoggedUser(null);
    history.push("/");
  };

  return (
    <HeaderArea>
      <div className="logo-title">
        <h1>Ecommerce</h1>
        <img
          src="https://www.dche.ufscar.br/pt-br/assets/imagens/logo-ufscar.png/@@images/image.png"
          alt="Logo"
          style={{ width: "110px", height: "70px" }}
        />
      </div>
      <nav>
        {/* "Perfil" dropdown is still used as the login/logout control */}
        {loggedUser ? (
          <Dropdown>
            <h2 onClick={() => setDropdownVisible(!dropdownVisible)}>
              Perfil
            </h2>
            <DropdownContent show={dropdownVisible}>
              {/* Removed Profile link */}
              {loggedUser.role === "admin" && <Link to="/admin">Admin Page</Link>}
              <div onClick={handleLogout}>Logout</div>
            </DropdownContent>
          </Dropdown>
        ) : (
          <Dropdown>
            <h2 onClick={() => setDropdownVisible(!dropdownVisible)}>
              Perfil
            </h2>
            <DropdownContent show={dropdownVisible}>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </DropdownContent>
          </Dropdown>
        )}
        <Link to="/"><h2>Loja</h2></Link>
        <Link to="/cart"><h2>Carrinho</h2></Link>
      </nav>
    </HeaderArea>
  );
};
