import React, { useState } from 'react';
import styled from 'styled-components';
import maleIcon from '../../img/male.png';
import femaleIcon from '../../img/female.png';
import { signout, burgerIcon, signinIcon } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';
import SignInForm from '../Auth/SignInUp'; 

function Navigation({ active, setActive }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
    const { 
        userPreferences, 
        updateUserPreferences, 
        updateProfile,  
        setIncomes, 
        setExpenses, 
        setError,
        signOut,
        isAuthenticated
    } = useGlobalContext();

    const handleMenuItemClick = (id) => {
        setActive(id);
        setMenuOpen(false);
    };

    const handleNameChange = (e) => {
        updateUserPreferences({ name: e.target.value });
    };

    const handleAvatarChange = (e) => {
        updateUserPreferences({ avatar: e.target.value });
    };

    const handleProfileSave = async () => {
        try {
            const success = await updateProfile({
                name: userPreferences.name,
                avatar: userPreferences.avatar
            });

            if (success) {
                setIsProfileModalOpen(false); // Close modal after successful save
            } else {
                setError('Error updating profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            setError('Error updating profile');
        }
    };

    const handleSignOut = () => {
        updateUserPreferences({ name: 'User', avatar: 'male' });
        setIncomes([]);
        setExpenses([]);
        setError(null);
        signOut();
    };

    return (
        <Header>
            <UserInfo>
                <img
                    src={userPreferences.avatar === 'male' ? maleIcon : femaleIcon}
                    alt="User Avatar"
                />
                <div className="text">
                    <h2>{userPreferences.name}</h2>
                    <EditIcon onClick={() => setIsProfileModalOpen(true)}>✎</EditIcon> 
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
                {isAuthenticated ? (
                    <li onClick={handleSignOut} className="signout">
                        {signout}
                        <span>Sign Out</span>
                    </li>
                ) : (
                    <li onClick={() => setIsSignInModalOpen(true)} className="signin">
                        {signinIcon} 
                        <span>Sign In</span>
                    </li>
                )}
            </Menu>

            {isProfileModalOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={() => setIsProfileModalOpen(false)}>✕</CloseButton>
                        <h2>Edit Profile</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={userPreferences.name}
                                onChange={handleNameChange}
                                placeholder="Enter your name"
                            />
                        </label>
                        <label>
                            Icon:
                            <select value={userPreferences.avatar} onChange={handleAvatarChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                        <button onClick={handleProfileSave}>Save</button> {/* Updated: Use handleProfileSave */}
                    </ModalContent>
                </Modal>
            )}

            {isSignInModalOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={() => setIsSignInModalOpen(false)}>✕</CloseButton>
                        <h2>Sign In</h2>
                        <SignInForm /> 
                    </ModalContent>
                </Modal>
            )}
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
    height: 80px;

    @media (max-width: 600px) {
        width:100%;
        height:70px;
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

        position: relative;
    }
`;

const EditIcon = styled.span`
    font-size: 1rem;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: -20px;
    color: Wheat;

    &:hover {
        color: White;
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

        &.signout {
            color: #f44336;

            i {
                color: #f44336;
            }

            &:hover {
                color: red;

                i {
                    color: red;
                }
            }
        }

        &.signin a {
            color: wheat;
            text-decoration: none;
        }

        &.signin:hover a {
            color: white;
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

const BurgerIcon = styled.div`
    display: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContent = styled.div`
    background: linear-gradient(180deg, #652931 100%, #F2994A 100%);
    animation: 15s alternate linear infinite;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    position: relative;

    h2 {
        margin-bottom: 1rem;
        color:white;
        font-size:1.5rem;
    }

    label {
        display: flex;
        flex-direction: column;
        color:white;
        font-size:1rem;
        gap: 0.5rem;
        margin-bottom: 1rem;

        input, select {
            padding: 0.5rem;
            border: 1px solid gray;
        }
    }

    button {
        padding: 0.5rem 1rem;
        background: var(--color-accent) ;
        color: white;
        border: none;
        cursor: pointer;
        border-radius:15px;
        padding: 10 40px;

        &:hover {
            background: var(--color-green);
        }
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    color: white;

    &:hover {
        color: red;
    }
`;

export default Navigation;
