import styled from 'styled-components';

export const ProductArea = styled.div`
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    margin-top: 20px;

    

    div {
        height: 320px;
        width: 250px;
        border: 2px solid rgb(88, 33, 105);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        button {
            font-size: 25px;
            background: transparent;
            border: none;
            color: purple;
        }

        img {
            width: 160px; /* Altere o valor conforme necessário */
            height: 140px;
        }

    }
`;
