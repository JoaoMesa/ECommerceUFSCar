import React, { useEffect, useState } from 'react';
import { BsFillCartCheckFill, BsFillCartPlusFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import { ProductArea } from '../css/style';
import { Header } from '../components/Header';

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoyt') || []);
    const [search, setSearch] = useState(''); 
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(''); 

    useEffect(() => {
        const fetchProducts = async () => {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('name', search);
            if (selectedCategory) queryParams.append('categoryId', selectedCategory);

            const url = `http://localhost:5000/products?${queryParams.toString()}`;
            const response = await fetch(url);
            const objJson = await response.json();
            setData(objJson);
        };
        fetchProducts();
    }, [search, selectedCategory]); 

    
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:5000/categories');
            const objJson = await response.json();
            setCategories(objJson);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setCart(getItem('carrinhoyt') || []);
    }, []);

    const handleClick = (obj) => {
        const element = cart.find((e) => e.id === obj.id);
        let updatedCart;
        if (element) {
            updatedCart = cart.filter((e) => e.id !== obj.id);
        } else {
            updatedCart = [...cart, obj];
        }
        setCart(updatedCart);
        setItem('carrinhoyt', updatedCart);
    };

    return (
        <div>
            <Header />

            {/* Filtros */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                {/* Campo de pesquisa */}
                <input
                    type="text"
                    placeholder="Buscar produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px'
                    }}
                />

                {/* Seletor de categorias */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                >
                    <option value="">Todas as categorias</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de produtos */}
            <ProductArea>
                {data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.name}</h4>
                        <img src={e.image} alt="" />
                        <h4>{`R$ ${e.price}`}</h4>
                        <button onClick={() => handleClick(e)}>
                            {cart.some((itemCart) => itemCart.id === e.id) ? (
                                <BsFillCartCheckFill size={40} />
                            ) : (
                                <BsFillCartPlusFill size={40} />
                            )}
                        </button>
                    </div>
                ))}
            </ProductArea>
        </div>
    );
};
