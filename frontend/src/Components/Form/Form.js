import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        amount: '',
        date: '',
        category: '',
        customCategory: '', 
    });

    const {amount, date, category, customCategory} = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !date || !category || (category === 'other' && !customCategory)) {
            setError('Please fill in all required fields.');
            return;
        }
    
        const finalCategory = category === 'other' ? customCategory : category;
    
        try {
            await addIncome({ amount, date, category: finalCategory }); // Make sure this is correct
            setInputState({ amount: '', date: '', category: '', customCategory: '' });
        } catch (error) {
            console.error(error);
        }
    };
    
    
    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}

            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {category === 'other' && (
                <div className="input-control">
                    <input
                        type="text"
                        value={customCategory}
                        name="customCategory"
                        placeholder="Enter Custom Category"
                        onChange={handleInput('customCategory')}
                    />
                </div>
            )}
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Enter Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => {
                        setInputState({ ...inputState, date });
                    }}
                />
            </div>

            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#42AD00'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #ddd;
    background: #f8f8f8; 
    color: black; 
    &::placeholder {
      color: Black; 
    }
  }
  .input-control {
    input {
      width: fit-content;
    }
  }
  .selects {
    display: flex;
    justify-content: flex-start;
    select {
      color: #333;
    }
    select:focus {
      color: #222; 
    }
  }
  .submit-btn {
    display: flex;
    justify-content: flex-start;
  }
`;

export default Form;
