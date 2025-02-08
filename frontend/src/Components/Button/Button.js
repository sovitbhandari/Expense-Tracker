import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg = '#42AD00', bPad = '.8rem 1.6rem', color = '#fff', bRad = '30px' }) {
    return (
        <ButtonStyled bg={bg} bPad={bPad} bRad={bRad} color={color} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: ${({ bPad }) => bPad};
    border-radius: ${({ bRad }) => bRad};
    background: ${({ bg }) => bg};
    color: ${({ color }) => color};
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.9;
        transform: scale(1.05);
    }
`;

export default Button;
