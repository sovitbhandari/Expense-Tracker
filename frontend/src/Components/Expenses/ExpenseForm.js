import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { fetchExpenses, removeExpense } from '../../redux/store/expenseSlice';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.expense.error);
    const [inputState, setInputState] = useState({
        amount: '',
        date: '',
        category: '',
        customCategory: '', 
    });

    const { amount, date, category, customCategory } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        if (!amount || !date || !category || (category === 'other' && !customCategory)) {
            alert('Please fill in all required fields.'); // Alert for better user feedback
            return;
        }

        const finalCategory = category === 'other' ? customCategory : category;
        dispatch(addExpense({ amount, date, category: finalCategory }));

        setInputState({
            amount: '',
            date: '',
            category: '',
            customCategory: '',
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error text-red-500'>{error}</p>}

            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
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
                    type="number"
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
                    onChange={date => setInputState({ ...inputState, date })}
                />
            </div>

            <div className="submit-btn">
                <Button
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
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

export default ExpenseForm;
