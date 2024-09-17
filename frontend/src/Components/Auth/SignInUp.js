import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';
import Button from '../Button/Button';

function AuthForm() {
    const { signIn, signUp, error, setError, setIsAuthenticated } = useGlobalContext();
    const [inputState, setInputState] = useState({
        username: '',
        password: '',
        name: '', // Add name for sign up
        avatar: 'male' // Default to male avatar
    });
    const [isSignUpMode, setIsSignUpMode] = useState(false);  // Toggle between SignIn and SignUp
    const [showPassword, setShowPassword] = useState(false); // Manage password visibility

    const { username, password, name, avatar } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError(''); // Clear previous errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password || (isSignUpMode && !name)) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            if (isSignUpMode) {
                const success = await signUp({ username, password, name, avatar });
                if (success) {
                    setIsAuthenticated(true);
                    window.location.href = '/dashboard'; // Redirect to dashboard
                }
            } else {
                const success = await signIn({ username, password });
                if (success) {
                    setIsAuthenticated(true);
                    window.location.href = '/dashboard'; // Redirect to dashboard
                } else {
                    setError('Wrong credentials');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthFormStyled onSubmit={handleSubmit}>
            <h2>{isSignUpMode ? 'Sign Up' : 'Sign In'}</h2>
            {error && <p className='error'>{error}</p>}
            {isSignUpMode && (
                <div className="input-control">
                    <input
                        type="text"
                        value={name}
                        name="name"
                        placeholder="Name"
                        onChange={handleInput('name')}
                    />
                </div>
            )}
            <div className="input-control">
                <input
                    type="text"
                    value={username}
                    name="username"
                    placeholder="Username"
                    onChange={handleInput('username')}
                />
            </div>
            <div className="input-control">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={handleInput('password')}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            {isSignUpMode && (
                <div className="input-control">
                    <label>Avatar:</label>
                    <select value={avatar} onChange={handleInput('avatar')}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            )}
            <div className="submit-btn">
                <Button
                    name={isSignUpMode ? 'Sign Up' : 'Sign In'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#42AD00'}
                    color={'#fff'}
                />
            </div>
            <div className="footer">
                {isSignUpMode ? (
                    <p>Already have an account? <span onClick={() => setIsSignUpMode(false)}>Sign In</span></p>
                ) : (
                    <p>Don't have an account? <span onClick={() => setIsSignUpMode(true)}>Create an account</span></p>
                )}
            </div>
        </AuthFormStyled>
    );
}

const AuthFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  max-width: 400px;
  margin: 0 auto;

  h2 {
    text-align: center;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .input-control {
    position: relative;
  }

  .input-control span {
    position: absolute;
    top: 50%;
    right: 10px;
    cursor: pointer;
    transform: translateY(-50%);
  }

  .submit-btn {
    display: flex;
    justify-content: center;
  }

  .error {
    color: red;
    text-align: center;
  }

  .footer {
    text-align: center;
    p {
      color: #333;
    }
    span {
      color: #42AD00;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default AuthForm;
