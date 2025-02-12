import React, { useState, useEffect } from "react";
import { getItem } from "../services/LocalStorageFuncs";
import { AdminHeader } from "../components/AdminHeader";
import styled from "styled-components";

// Estilos consistentes com as outras páginas
const AdminArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
  padding: 20px;

  h2 {
    color: purple;
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
    padding: 20px;
    border: 2px solid rgb(88, 33, 105);
    border-radius: 8px;

    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: bold;
    }

    input {
      padding: 8px;
      font-size: 16px;
      border: 1px solid purple;
      border-radius: 4px;
    }

    button[type="submit"] {
      padding: 10px;
      background-color: purple;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;

      &:hover {
        background-color: #6a1b9a;
      }
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 0;

    li {
      list-style: none;
      border: 2px solid rgb(88, 33, 105);
      border-radius: 8px;
      padding: 15px;
      width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      img {
        width: 160px;
        height: 140px;
        object-fit: cover;
        border-radius: 4px;
      }

      button {
        padding: 8px 15px;
        margin: 0 5px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;

        &:first-child {
          background-color: #ffc107;
          color: black;

          &:hover {
            background-color: #e0a800;
          }
        }

        &:last-child {
          background-color: #dc3545;
          color: white;

          &:hover {
            background-color: #c82333;
          }
        }
      }
    }
  }
`;


export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "", categoryId: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const token = getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const fetchCategories = async () => {
    const token = getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getItem("authToken");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `http://localhost:5000/products/${editingId}` : "http://localhost:5000/products";
    
    try {
      const { id, createdAt, updatedAt, ...formData } = form;
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, price: parseFloat(form.price), categoryId: parseInt(form.categoryId, 10) })
      });
      setForm({ name: "", description: "", image: "", price: "", categoryId: "" });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const token = getItem("authToken");
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  return (
    <div>
	<AdminHeader/>
	  <AdminArea>
      <h2>Gerenciar Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="url" placeholder="Imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <input type="number" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
          <option value="">Selecione uma Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button type="submit">{editingId ? "Atualizar" : "Adicionar"}</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            {product.name} - R$ {product.price}
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
	</AdminArea>
    </div>
  );
};
