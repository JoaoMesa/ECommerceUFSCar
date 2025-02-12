// pages/cart.jsx
import React, { useState, useEffect } from "react";
import { setItem, getItem } from "../services/LocalStorageFuncs";
import { BsFillCartDashFill, BsPlus, BsDash } from "react-icons/bs";
import styled from "styled-components";
import { ProductArea } from "../css/style";
import { Header } from "../components/Header";

// Componentes Estilizados
const PurchaseButton = styled.button`
  display: block;
  margin: 30px auto;
  padding: 14px 45px;
  background: linear-gradient(to right, rgb(88, 33, 105) 0%, rgb(128, 60, 155) 100%);
  color: white;
  border: 2px solid rgb(88, 33, 105);
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 10px rgba(88, 33, 105, 0.15);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(88, 33, 105, 0.3);
    border-color: rgb(109, 50, 126);
    background: linear-gradient(to right, rgb(109, 50, 126) 0%, rgb(148, 80, 175) 100%);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(88, 33, 105, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 35px;
    font-size: 1rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  margin: 10px 0;

  button {
    padding: 0;
    border: 1px solid rgb(88, 33, 105);
    border-radius: 50%;
    background: transparent;
    color: rgb(88, 33, 105);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    transition: all 0.2s;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      border-color: #ccc;
      color: #ccc;
    }

    &:hover:not(:disabled) {
      background-color: rgb(88, 33, 105);
      color: white;
    }
  }

  span {
    min-width: 30px;
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
  }
`;


export const Cart = () => {
  const [data, setData] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedData = getItem("carrinhoyt") || [];
    const dataWithQuantity = storedData.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setData(dataWithQuantity);
    const user = getItem("loggedUser");
    if (user) setLoggedUser(user);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setData(updatedData);
    setItem("carrinhoyt", updatedData);
  };

  const removeItem = (obj) => {
    const arrFilter = data.filter((e) => e.id !== obj.id);
    setData(arrFilter);
    setItem("carrinhoyt", arrFilter);
  };

  const handlePurchase = async () => {
    if (!loggedUser) {
      alert("Você precisa estar logado para realizar a compra.");
      return;
    }

    const token = getItem("authToken");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    const formattedProducts = data.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ products: formattedProducts })
      });

      if (!response.ok) throw new Error("Erro ao realizar a compra.");

      alert("Compra realizada com sucesso!");
      setItem("carrinhoyt", []);
      setData([]);
    } catch (error) {
      alert("Erro ao realizar a compra. Tente novamente.");
      console.error(error);
    }
  };

  const subTotal = data.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

  return (
    <div>
      <Header />
      <h3>{`Preço Total: R$ ${subTotal.toFixed(2)}`}</h3>
      <ProductArea>
        {data.map((e) => (
          <div key={e.id}>
            <h4>{e.name}</h4>
            <img src={e.image} alt={e.name} />
            <h4>{`R$ ${(e.price * e.quantity).toFixed(2)}`}</h4>
            
    
<QuantityControl>
  <button onClick={() => updateQuantity(e.id, e.quantity + 1)}>
    <BsPlus size={14} /> </button><span>{e.quantity}</span>  <button 
    onClick={() => updateQuantity(e.id, e.quantity - 1)}
    disabled={e.quantity === 1}
  >
    <BsDash size={14} />
  </button>
</QuantityControl>




            <button 
              onClick={() => removeItem(e)}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '5px',
                marginBottom: '50px' 
              }}
            >
              <BsFillCartDashFill size={24} color="#dc3545" />
            </button>
          </div>
        ))}
      </ProductArea>
      
      {data.length > 0 && (
        <PurchaseButton onClick={handlePurchase}>
          Finalizar Compra
        </PurchaseButton>
      )}
    </div>
  );
};
