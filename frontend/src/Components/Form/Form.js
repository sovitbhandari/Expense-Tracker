import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { plus } from '../../utils/Icons';
import Button from '../Button/Button';
import { addIncome } from '../../redux/store/incomeSlice';  // Updated import

const Form = ({ onClose }) => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: new Date(),  // Default to today's date
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || amount <= 0 || !date || !category) {
      alert('Please enter valid data!');
      return;
    }

    try {
      await dispatch(addIncome({
        title,
        amount: parseFloat(amount), // Ensure numeric conversion
        date,
        category,
        description
      }));
      setInputState({ title: '', amount: '', date: new Date(), category: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <input
        type="text"
        value={title}
        placeholder="Income Title"
        onChange={handleInput('title')}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />

      <input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={handleInput('amount')}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />

      <select
        value={category}
        onChange={handleInput('category')}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      >
        <option value="" disabled>Select Category</option>
        <option value="salary">Salary</option>
        <option value="freelancing">Freelancing</option>
        <option value="investments">Investments</option>
        <option value="stocks">Stocks</option>
        <option value="bitcoin">Cryptocurrency</option>
        <option value="bank">Bank Transfer</option>
        <option value="other">Other</option>
      </select>

      <DatePicker
        selected={date}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => setInputState({ ...inputState, date })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />

      <textarea
        value={description}
        placeholder="Add A Reference"
        onChange={handleInput('description')}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />

      <div className="flex justify-end space-x-4">
        <Button name="Cancel" onClick={onClose} bgColor="bg-gray-500" type="button" />
        <Button name="Add Income" icon={plus} type="submit" bgColor="bg-green-500" />
      </div>
    </form>
  );
};

export default Form;
