import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { plus } from '../../utils/Icons';
import Modal from '../Modal/Modal';

// Define these functions within the Income.js file
const groupIncomesByMonth = (incomes) => {
    return incomes.reduce((acc, income) => {
        const month = new Date(income.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(income);
        return acc;
    }, {});
};

const sortIncomesByDate = (groupedIncomes) => {
    const sortedMonths = Object.keys(groupedIncomes).sort((a, b) => new Date(b) - new Date(a));
    const sortedIncomes = sortedMonths.reduce((acc, month) => {
        acc[month] = groupedIncomes[month].sort((a, b) => new Date(b.date) - new Date(a.date));
        return acc;
    }, {});
    return { sortedMonths, sortedIncomes };
};

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
    const [groupedIncomes, setGroupedIncomes] = useState({});
    const [sortedMonths, setSortedMonths] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchIncomes = async () => {
            await getIncomes();
            const grouped = groupIncomesByMonth(incomes);
            const { sortedMonths, sortedIncomes } = sortIncomesByDate(grouped);
            setGroupedIncomes(sortedIncomes);
            setSortedMonths(sortedMonths);
        };
        fetchIncomes();
    }, [getIncomes, incomes]);

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className="header">
                    <div className="total-income-container">
                        <h2 className="total-income">
                            Total Income: <span>${totalIncome()}</span>
                        </h2>
                        <button className="add-income-button" onClick={() => setIsModalOpen(true)}>
                            {plus} Add Income
                        </button>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Form />
                </Modal>
                <div className="incomes">
                    {sortedMonths.map(month => (
                        <div key={month} className="month-group">
                            <h3>{month}</h3>
                            {groupedIncomes[month].map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .total-income-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        z-index:998;
    }

    .total-income {
        color: #222260
        z-index:999;
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
            color: var(--color-green);
        }
    }

    .add-income-button {
        font-size: 1.3rem;
        z-index:998;
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

    .incomes {
        margin-top:3rem;
        .month-group {
            // background: #FCF6F9;
            // border: 1px solid #343434;
            // box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 10px;
            // padding: 1rem;
            margin-bottom: 1rem;
            margin-top: 3rem;
            opacity:1;
            z-index: 1000;
            h3 {
                background: #FCF6F9;
                margin-bottom: 1rem;
                width: fit-content;
                padding:10px;
                border-radius:10px;
                color: Black;
                opacity:1;
            }
       
        }
    }
`;

export default Income;