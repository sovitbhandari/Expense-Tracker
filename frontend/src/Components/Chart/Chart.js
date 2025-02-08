import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { fetchIncomes } from '../../redux/actions/incomeActions';
import { fetchExpenses } from '../../redux/actions/expenseActions';

ChartJs.register(ArcElement, Tooltip, Legend);

function IncomeExpensePieChart() {
    const dispatch = useDispatch();
    
    // Access Redux store for incomes & expenses
    const incomes = useSelector(state => state.income.incomes);
    const expenses = useSelector(state => state.expense.expenses);

    const [chartType, setChartType] = useState('income');
    const [loading, setLoading] = useState(false);

    // Fetch incomes & expenses on component mount
    useEffect(() => {
        dispatch(fetchIncomes());
        dispatch(fetchExpenses());
    }, [dispatch]);

    // Check if data exists
    const hasIncomeData = incomes.length > 0;
    const hasExpenseData = expenses.length > 0;

    // Memoized income data
    const incomeData = useMemo(() => ({
        labels: incomes.map(income => income.category),
        datasets: [
            {
                label: 'Income by Category',
                data: incomes.map(income => income.amount),
                backgroundColor: ['#4CAF50', '#FFEB3B', '#00BCD4', '#FF5722', '#9C27B0', '#03A9F4', '#8BC34A'],
                borderWidth: 1,
                hoverOffset: 10,
            },
        ],
    }), [incomes]);

    // Memoized expense data
    const expenseData = useMemo(() => ({
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Expenses by Category',
                data: expenses.map(expense => expense.amount),
                backgroundColor: ['#673AB7', '#FF9800', '#03A9F4', '#9E9E9E', '#607D8B', '#795548'],
                borderWidth: 1,
                hoverOffset: 10,
            },
        ],
    }), [expenses]);

    // Handle chart loading effect
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, [chartType]);

    return (
        <ChartStyled>
            <ButtonContainer>
                <button onClick={() => setChartType('income')} disabled={loading || chartType === 'income'}>
                    {loading && chartType === 'income' ? 'Loading...' : 'Income'}
                </button>
                <button onClick={() => setChartType('expense')} disabled={loading || chartType === 'expense'}>
                    {loading && chartType === 'expense' ? 'Loading...' : 'Expenses'}
                </button>
            </ButtonContainer>

            {loading ? (
                <LoadingMessage>Loading chart data...</LoadingMessage>
            ) : (
                <>
                    {chartType === 'income' && hasIncomeData ? (
                        <PieChartMemo data={incomeData} />
                    ) : chartType === 'expense' && hasExpenseData ? (
                        <PieChartMemo data={expenseData} />
                    ) : (
                        <NoDataMessage>No data available for {chartType}</NoDataMessage>
                    )}
                </>
            )}
        </ChartStyled>
    );
}

// Memoized Pie Chart Component
const PieChartMemo = React.memo(({ data }) => <Pie data={data} options={{ animation: { duration: 0 } }} />);

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    margin: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s, opacity 0.3s;
        
        &:hover {
            opacity: 0.9;
        }
    }

    button:nth-child(1) {
        background-color: #03A9F4;
        &:hover {
            background-color: #0288D1;
        }
    }

    button:nth-child(2) {
        background-color: #F44336;
        &:hover {
            background-color: #D32F2F;
        }
    }
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    margin-top: 2rem;
`;

const NoDataMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #ff5722;
    margin-top: 2rem;
`;

export default Chart;
