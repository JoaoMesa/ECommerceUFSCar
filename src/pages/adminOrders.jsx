import React, { useState, useEffect } from "react";
import { getItem } from "../services/LocalStorageFuncs";

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
    <div>
      <h2>Gerenciar Pedidos</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Pedido #{order.id} - Status: {order.status}</p>
            <ul>
              {order.orderProduct.map((item) => (
                <li key={item.id}>
                  <img src={item.product.image} alt={item.product.name} width="50" />
                  {item.product.name} - Quantidade: {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={() => updateOrderStatus(order.id, "OnWay")}>
              Marcar como Enviado
            </button>
            <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
              Marcar como Entregue
            </button>
            <button onClick={() => deleteOrder(order.id)}>Excluir Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
