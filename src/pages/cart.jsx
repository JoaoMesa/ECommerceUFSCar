import React, { useState, useEffect } from 'react';
import { setItem, getItem } from '../services/LocalStorageFuncs';
import { BsFillCartDashFill } from 'react-icons/bs';
import { ProductArea  } from '../css/style';
import { Header } from '../components/Header';

export const Cart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = getItem('carrinhoyt') || [];
        setData(storedData);
    }, []);

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id);
        setData(arrFilter);
        setItem('carrinhoyt', arrFilter);
    };

    const subTotal = data.reduce((acc, cur) => acc + cur.price, 0)

    return (
        <div>
            <Header/>
            <h3>{`SubTotal: R$ ${subTotal}`}</h3>
            <ProductArea>
                {data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt={e.title} />
                        <h4>{`R$ ${e.price}`}</h4>
                        <button onClick={() => removeItem(e)}>
                            <BsFillCartDashFill size={40}/>
                        </button>
                    </div>
                ))}
            </ProductArea>
        </div>
    );
};
