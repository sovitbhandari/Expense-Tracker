import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext'; // Import context
import { closeIcon } from '../../utils/Icons';

const AuthModal = ({ showModal, setShowModal }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { signIn, setError } = useGlobalContext(); // Use context, remove signOut if not used

    // Handle form submission for sign-in
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                signIn(); // Update context state on successful sign-in
                setShowModal(false); // Close modal
            } else {
                setError('Sign-in failed: ' + await response.text()); // Handle error
            }
        } catch (err) {
            setError('Sign-in request failed: ' + err.message); // Handle network errors
        }
    };

    // Handle form submission for sign-up
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                signIn(); // Optionally sign in after successful sign-up
                setShowModal(false); // Close modal
            } else {
                setError('Sign-up failed: ' + await response.text()); // Handle error
            }
        } catch (err) {
            setError('Sign-up request failed: ' + err.message); // Handle network errors
        }
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    if (!showModal) return null; // Don't render if modal is not shown

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={closeModal}>{closeIcon}</CloseButton>
                {isSignIn ? (
                    <>
                        <h2>Sign In</h2>
                        <Form onSubmit={handleSignIn}>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                            />
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Password"
                            />
                            <Button type="submit">Sign In</Button>
                        </Form>
                        <SwitchLink onClick={() => setIsSignIn(false)}>Create an account</SwitchLink>
                    </>
                ) : (
                    <>
                        <h2>Sign Up</h2>
                        <Form onSubmit={handleSignUp}>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                            />
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Password"
                            />
                            <Button type="submit">Sign Up</Button>
                        </Form>
                        <SwitchLink onClick={() => setIsSignIn(true)}>Already have an account? Sign In</SwitchLink>
                    </>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

// Styled-components for the modal
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    position: relative; /* Add position relative */
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem;
    background: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    
    &:hover {
        background: #0056b3;
    }
`;

const SwitchLink = styled.a`
    color: #007bff;
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    
    &:hover {
        text-decoration: underline;
    }
`;

const CloseButton = styled.button`
    position: absolute; /* Position the button absolutely */
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
        color: #0056b3;
    }
`;

export default AuthModal;