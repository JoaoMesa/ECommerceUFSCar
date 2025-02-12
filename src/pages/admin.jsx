import React, { useState, useEffect } from "react";
import { getItem } from "../services/LocalStorageFuncs";

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "", categoryId: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getItem("authToken");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `http://localhost:5000/products/${editingId}` : "http://localhost:5000/products";
    
    try {
      console.log(form);
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
      <h2>Gerenciar Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="url" placeholder="Imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <input type="number" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="number" placeholder="Categoria ID" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required />
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
    </div>
  );
};
