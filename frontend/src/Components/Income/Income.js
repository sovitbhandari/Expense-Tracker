import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { plus } from '../../utils/Icons';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

// Group incomes by month
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

// Sort incomes by date
const sortIncomesByDate = (groupedIncomes) => {
    const sortedMonths = Object.keys(groupedIncomes).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');

        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);

        return dateB - dateA; // Sort descending by date
    });

    const sortedIncomes = sortedMonths.reduce((acc, month) => {
        acc[month] = groupedIncomes[month].sort((a, b) => new Date(b.date) - new Date(a.date));
        return acc;
    }, {});

    return { sortedMonths, sortedIncomes };
};

const Income = () => {
    const { incomes, fetchIncomes, removeIncome, calculateTotalIncome } = useGlobalContext();
    const [groupedIncomes, setGroupedIncomes] = useState({});
    const [sortedMonths, setSortedMonths] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAndGroupIncomes = async () => {
            await fetchIncomes();
            const grouped = groupIncomesByMonth(incomes);
            const { sortedMonths, sortedIncomes } = sortIncomesByDate(grouped);
            setGroupedIncomes(sortedIncomes);
            setSortedMonths(sortedMonths);
        };
        fetchAndGroupIncomes();
    }, [fetchIncomes, incomes]);

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Total Income: <span>${calculateTotalIncome()}</span></h2>
                    <Button
                        name="Add Income"
                        icon={plus}
                        onClick={() => setIsModalOpen(true)}
                        bgColor="bg-green-500"
                    />
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Form onClose={() => setIsModalOpen(false)} />
                </Modal>

                <div className="incomes">
                    {sortedMonths.map(month => (
                        <div key={month} className="month-group">
                            <h3>{month}</h3>
                            {groupedIncomes[month].map((income) => {
                                const { _id, title, amount, date, category, type } = income;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--color-green)"
                                        deleteItem={removeIncome}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
};

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 90vh;

    .incomes {
        margin-top: 3rem;
        .month-group {
            margin-bottom: 1rem;
            h3 {
                background: #FCF6F9;
                margin-bottom: 0.8rem;
                padding: 10px;
                font-size: 1rem;
                border-radius: 10px;
                color: black;
            }
        }
    }
`;

export default Income;
