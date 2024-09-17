import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import { plus } from '../../utils/Icons';
import Modal from '../Modal/Modal';

// Function to group expenses by month
const groupExpensesByMonth = (expenses) => {
    return expenses.reduce((acc, expense) => {
        const month = new Date(expense.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(expense);
        return acc;
    }, {});
};

// Function to sort expenses by date
const sortExpensesByDate = (groupedExpenses) => {
    const sortedMonths = Object.keys(groupedExpenses).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');

        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);

        return dateB - dateA; // Sort descending by date
    });

    const sortedExpenses = sortedMonths.reduce((acc, month) => {
        acc[month] = groupedExpenses[month].sort((a, b) => new Date(b.date) - new Date(a.date));
        return acc;
    }, {});

    return { sortedMonths, sortedExpenses };
};

function Expenses() {
    const { expenses, fetchExpenses, removeExpense, calculateTotalExpenses} = useGlobalContext();
    const [groupedExpenses, setGroupedExpenses] = useState({});
    const [sortedMonths, setSortedMonths] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchAndGroupExpenses = async () => {
            await fetchExpenses();
            const grouped = groupExpensesByMonth(expenses);
            const { sortedMonths, sortedExpenses } = sortExpensesByDate(grouped);
            setGroupedExpenses(sortedExpenses);
            setSortedMonths(sortedMonths);
        };
        fetchAndGroupExpenses();
    }, [fetchExpenses, expenses]);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className="header">
                    <div className="total-expense-container">
                        <h2 className="total-expense">
                            Total Expense: <span>${calculateTotalExpenses()}</span>
                        </h2>
                        <button className="add-expense-button" onClick={() => setIsModalOpen(true)}>
                            {plus} Add Expense
                        </button>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseForm/>
                </Modal>
                <div className="expenses">
                    {sortedMonths.map(month => (
                        <div key={month} className="month-group">
                            <h3>{month}</h3>
                            {groupedExpenses[month].map((expense) => {
                                const { _id, title, amount, date, category, type } = expense;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--color-red)"
                                        deleteItem={removeExpense}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 90vh;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .total-expense-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        z-index: 998;
    }

    .total-expense {
        color: #222260;
        background: wheat;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 1.7rem;
        gap: .5rem;
        span {
            font-size: 2rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }

    .add-expense-button {
        font-size: 1.3rem;
        z-index: 998;
        background-color: var(--color-accent);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 0.8rem 1.6rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
            background-color: var(--color-green);
        }
    }

    .expenses {
        margin-top: 3rem;
        .month-group {
            border-radius: 10px;
            margin-bottom: 1rem;
            margin-top: 3rem;
            opacity: 1;
            z-index: 1000;
            h3 {
                background: #FCF6F9;
                margin-bottom: 1rem;
                width: fit-content;
                padding: 10px;
                font-size: 1rem;
                border-radius: 10px;
                color: Black;
                opacity: 1;
            }
        }
    }

    @media (max-width: 700px) {
        .header .total-expense-container {
            display: grid;
            gap: 1rem;
            margin-bottom: 2rem;
        }
    }
`;

export default Expenses;
