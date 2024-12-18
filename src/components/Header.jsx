import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from 'styled-components';

const HeaderArea = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Distribui os itens entre as extremidades */
    gap: 50px;
    background-color: purple;
    padding: 20px;
    margin-bottom: 70px;

    .logo-title {
        display: flex;
        align-items: center;
        gap: 20px; /* Espaçamento entre a imagem e o título */
    }

    h1 {
        color: white;
        margin: 0;
    }

    nav {
        display: flex;
        gap: 20px; /* Ajuste o valor conforme necessário */
    }

    a {
        text-decoration: none;
        color: white;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Header = () => {
    return (
        <HeaderArea>
            <div className="logo-title">
                <h1>Ecommerce</h1>
                <img src="https://www.dche.ufscar.br/pt-br/assets/imagens/logo-ufscar.png/@@images/image.png" alt="Logo" style={{ width: '110px', height: '70px' }} /> {/* Ajuste a URL e o tamanho da imagem conforme necessário */}
                
            </div>
            <nav>
                <Link to="/"><h2>Loja</h2></Link>
                <Link to="/cart"><h2>Carrinho</h2></Link>
            </nav>
        </HeaderArea>
    );
}
