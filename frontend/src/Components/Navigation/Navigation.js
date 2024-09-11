import React, { useState } from 'react';
import styled from 'styled-components';
import user from '../../img/user.png';
import { signout, burgerIcon } from '../../utils/Icons'; // Add burgerIcon import
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuItemClick = (id) => {
        setActive(id);
        setMenuOpen(false); // Close menu on item click
    };

    return (
        <Header>
            <UserInfo>
                <img src={user} alt="User Avatar" />
                <div className="text">
                    <h2>User</h2>
                </div>
            </UserInfo>
            <BurgerIcon onClick={() => setMenuOpen(!menuOpen)}>
                {burgerIcon}
            </BurgerIcon>
            <Menu className={menuOpen ? 'open' : ''}>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </Menu>
            <SignOut>
                {signout} Sign Out
            </SignOut>
        </Header>
    );
}

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    height: 80px; /* Adjust as needed */

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        background: #fcf6f9;
        border: 2px solid #FFFFFF;
        padding: .2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    .text {
        color: white;

        h2 {
            color: Wheat;
            margin: 0;
        }

        p {
            margin: 0;
        }
    }
`;

const Menu = styled.ul`
    display: flex;
    gap: 2rem;
    transition: all 0.3s ease;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: wheat;
        padding: .5rem;
        position: relative;

        i {
            color: Wheat;
            font-size: 1.4rem;
            transition: all .4s ease-in-out;
        }

        span {
            font-size: 0.8rem;
            margin-top: .2rem;
        }

        &.active {
            color: White !important;

            i {
                color: white !important;
            }
        }
    }

    @media (max-width: 768px) {
        display: ${props => props.className === 'open' ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background: black;
        padding: 1rem;
    }
`;

const SignOut = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    color: Wheat;

    @media (max-width: 768px) {
        display: none;
    }
`;

const BurgerIcon = styled.div`
    display: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;

    @media (max-width: 768px) {
        display: block;
    }
`;

export default Navigation;
