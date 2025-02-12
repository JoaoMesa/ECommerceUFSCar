// pages/cart.jsx
import React, { useState, useEffect } from "react";
import { setItem, getItem } from "../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { ProductArea } from "../css/style";
import { Header } from "../components/Header";

export const Cart = () => {
  const [data, setData] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedData = getItem("carrinhoyt") || [];
    setData(storedData);
    const user = getItem("loggedUser");
    if (user) setLoggedUser(user);
  }, []);

  const removeItem = (obj) => {
    const arrFilter = data.filter((e) => e.id !== obj.id);
    setData(arrFilter);
    setItem("carrinhoyt", arrFilter);
  };

  const subTotal = data.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div>
      <Header />
      <h3>{`Preço Total: R$ ${subTotal}`}</h3>
      <ProductArea>
        {data.map((e) => (
          <div key={e.id}>
            <h4>{e.name}</h4>
            <img src={e.image} alt={e.image} />
            <h4>{`R$ ${e.price}`}</h4>
            <button onClick={() => removeItem(e)}>
              <BsFillCartDashFill size={40} />
            </button>
          </div>
        ))}
      </ProductArea>
    </div>
  );
};
