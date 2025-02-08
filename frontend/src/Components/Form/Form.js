// Form.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { plus } from '../../utils/Icons';
import Button from '../Button/Button';

const Form = ({ onClose }) => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = name => e => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Dispatch your action here
      await dispatch(/* your add income action */);
      
      // Reset form
      setInputState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
      });
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Income Title"
          onChange={handleInput('title')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        
        <input
          type="number"
          value={amount}
          name="amount"
          placeholder="Amount"
          onChange={handleInput('amount')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <select
          value={category}
          name="category"
          onChange={handleInput('category')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date });
          }}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <textarea
          value={description}
          name="description"
          placeholder="Add A Reference"
          onChange={handleInput('description')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          name="Cancel"
          onClick={onClose}
          bgColor="bg-gray-500"
          type="button"
        />
        <Button
          name="Add Income"
          icon={plus}
          type="submit"
          bgColor="bg-green-500"
        />
      </div>
    </form>
  );
};
