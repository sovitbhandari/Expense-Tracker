import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes } from '../../redux/actions/incomeActions';
import { fetchExpenses } from '../../redux/actions/expenseActions';
import History from '../../History/History';
import Chart from '../Chart/Chart';
import { dollar } from '../../utils/Icons';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { totalIncome } = useSelector((state) => state.incomes);
    const { totalExpenses } = useSelector((state) => state.expenses);
    const balance = totalIncome - totalExpenses;

    useEffect(() => {
        dispatch(fetchIncomes());
        dispatch(fetchExpenses());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold text-center text-wheat">Spending Report</h1>
            <Chart />

            <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold">Remaining Balance</h2>
                <p className="text-green-600 text-lg font-bold">{dollar} {balance}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Income</h2>
                    <p className="text-green-600 text-lg font-bold">{dollar} {totalIncome}</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Expense</h2>
                    <p className="text-red-500 text-lg font-bold">{dollar} {totalExpenses}</p>
                </div>
            </div>

            <div className="w-full mt-6">
                <History />
            </div>
        </div>
    );
};

export default Dashboard;
