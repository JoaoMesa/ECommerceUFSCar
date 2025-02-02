import React, { useEffect, useState } from 'react';
import { BsFillCartCheckFill, BsFillCartPlusFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import { ProductArea  } from '../css/style';
import { Header } from '../components/Header';

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoyt') || []);

    useEffect(() => {
        const fetchApi = async () => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=variant 2';
            const response = await fetch(url);
            const objJson = await response.json();
            setData(objJson.results);
        };
        fetchApi();
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
            <Header/>
            <ProductArea>
                {data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt="" />
                        <h4>{`R$ ${e.price}`}</h4>
                        <button onClick={() => handleClick(e)}>
                            {cart.some((itemCart) => itemCart.id === e.id) ? (
                                <BsFillCartCheckFill size={40}/>
                            ) : (
                                <BsFillCartPlusFill size={40}/>
                            )}
                        </button>
                    </div>
                ))}
            </ProductArea>
        </div>
    );
};
