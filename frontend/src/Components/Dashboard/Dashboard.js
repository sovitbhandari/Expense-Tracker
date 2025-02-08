import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes } from '../../redux/actions/incomeActions';
import { fetchExpenses } from '../../redux/actions/expenseActions';
import History from '../../history/History';
import Chart from '../Chart/Chart';
import { dollar } from '../../utils/Icons';

const Dashboard = () => {
    const dispatch = useDispatch();

    // Ensure correct Redux state mapping
    const totalIncome = useSelector((state) => state.income.totalIncome || 0);
    const totalExpenses = useSelector((state) => state.expense.totalExpenses || 0);
    const balance = totalIncome - totalExpenses;

    useEffect(() => {
        dispatch(fetchIncomes());
        dispatch(fetchExpenses());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center p-6 w-full">
            <h1 className="text-3xl font-bold text-center text-wheat mb-4">Spending Report</h1>
            <div className="w-full max-w-4xl">
                <Chart />
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold">Remaining Balance</h2>
                <p className={`text-lg font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {dollar} {balance.toLocaleString()}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
                <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold text-green-800">Total Income</h2>
                    <p className="text-green-600 text-lg font-bold">{dollar} {totalIncome.toLocaleString()}</p>
                </div>

                <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold text-red-800">Total Expense</h2>
                    <p className="text-red-500 text-lg font-bold">{dollar} {totalExpenses.toLocaleString()}</p>
                </div>
            </div>

            <div className="w-full max-w-4xl mt-8">
                <History />
            </div>
        </div>
    );
};

export default Dashboard;
