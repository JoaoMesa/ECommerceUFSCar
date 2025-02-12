import React, { useState, useEffect } from "react";
import { getItem } from "../services/LocalStorageFuncs";
import { AdminHeader} from "../components/AdminHeader";
import styled from 'styled-components';

const OrdersContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    
    h2 {
        text-align: center;
        color: rgb(88, 33, 105);
        margin: 30px 0;
    }

    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
`;

const OrderItem = styled.li`
    border: 2px solid rgb(88, 33, 105);
    padding: 20px;
    border-radius: 8px;

    > p {
        margin: 0 0 15px 0;
        font-size: 1.2rem;
        color: rgb(88, 33, 105);
        font-weight: bold;
    }
`;

const ProductsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;

    li {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;

        img {
            width: 60px;
            height: 60px;
            object-fit: cover;
        }
    }
`;

const OrderActions = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 20px;

    button {
        padding: 8px 15px;
        border: 2px solid rgb(88, 33, 105);
        border-radius: 5px;
        background: transparent;
        color: rgb(88, 33, 105);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: rgb(88, 33, 105);
            color: white;
        }
    }
`;


// ====================

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    const token = getItem("authToken");
    try {
      await fetch("http://localhost:5000/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: { id, status: newStatus } }),
      });
      fetchOrders();
    } catch (error) {
      console.error("Erro ao atualizar pedido", error);
    }
  };

  const deleteOrder = async (id) => {
    const token = getItem("authToken");
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (error) {
      console.error("Erro ao excluir pedido", error);
    }
  };

return (
    <OrdersContainer>
      <AdminHeader />
      <h2>Gerenciar Pedidos</h2>
      <ul>
        {orders.map((order) => (
          <OrderItem key={order.id}>
            <p>Pedido #{order.id} - Status: {order.status}</p>
            <ProductsList>
              {order.orderProduct.map((item) => (
                <li key={item.id}>
                  <img src={item.product.image} alt={item.product.name} />
                  <span>{item.product.name} - Quantidade: {item.quantity}</span>
                </li>
              ))}
            </ProductsList>
            <OrderActions>
              <button onClick={() => updateOrderStatus(order.id, "OnWay")}>
                Marcar como Enviado
              </button>
              <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
                Marcar como Entregue
              </button>
              <button onClick={() => deleteOrder(order.id)}>Excluir Pedido</button>
            </OrderActions>
          </OrderItem>
        ))}
      </ul>
    </OrdersContainer>
  );
};
