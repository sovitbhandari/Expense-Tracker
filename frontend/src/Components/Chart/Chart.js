import React, { useState, useEffect, useMemo } from 'react';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function IncomeExpensePieChart() {
    const { incomes, expenses } = useGlobalContext();
    const [chartType, setChartType] = useState('income'); // Track which chart to display
    const [loading, setLoading] = useState(false); // Loading state for chart switch

    // Handle no data available fallback
    const hasIncomeData = useMemo(() => incomes && incomes.length > 0, [incomes]);
    const hasExpenseData = useMemo(() => expenses && expenses.length > 0, [expenses]);

    // Prepare income data for the pie chart
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

    // Prepare expense data for the pie chart
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

    // Simulate loading state during chart switching
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300); // Simulate a short loading delay
        return () => clearTimeout(timer);
    }, [chartType]);

    // Pie chart options: Disable animation
    const chartOptions = {
        animation: {
            duration: 0, // Instant animation (set this higher for faster animation)
        },
    };

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
            ) : chartType === 'income' && hasIncomeData ? (
                <PieChartMemo data={incomeData} options={chartOptions} />
            ) : chartType === 'expense' && hasExpenseData ? (
                <PieChartMemo data={expenseData} options={chartOptions} />
            ) : (
                <NoDataMessage>No data available for {chartType === 'income' ? 'income' : 'expenses'}</NoDataMessage>
            )}
        </ChartStyled>
    );
}

// Memoize Pie component to prevent unnecessary re-renders
const PieChartMemo = React.memo(({ data, options }) => <Pie data={data} options={options} />);

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
        pointer-events: ${props => (props.disabled ? 'none' : 'auto')}; 
        
        &:hover {
            opacity: 0.9;
        }
    }

    button:nth-child(1) { /* Income button */
        background-color: #03A9F4;

        &:hover {
            background-color: #0288D1;
        }
    }

    button:nth-child(2) { /* Expenses button */
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

export default IncomeExpensePieChart;
