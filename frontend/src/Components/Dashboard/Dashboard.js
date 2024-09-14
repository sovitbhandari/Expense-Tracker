import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    // Fetching the context values and functions
    const { 
        calculateTotalIncome, 
        calculateTotalExpenses, 
        calculateTotalBalance, 
        fetchIncomes, 
        fetchExpenses 
    } = useGlobalContext();

    // Fetch incomes and expenses when the component mounts
    useEffect(() => {
        fetchIncomes();
        fetchExpenses();
    }, [fetchIncomes, fetchExpenses]);

    return (
        <DashboardStyled>
            <div className="chart-container">
                <h1>Spending Report</h1>
                <Chart />
                <div className="balance">
                    <h2>Remaining Balance</h2>
                    <p>{dollar} {calculateTotalBalance()}</p>
                </div>
            </div>
            <div className="stats-con">
                <div className="chart-con">
                    <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>{dollar} {calculateTotalIncome()}</p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>{dollar} {calculateTotalExpenses()}</p>
                        </div>
                    </div>
                </div>
                <div className="history-con">
                    <History />
                </div>
            </div>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1.5rem;

    .chart-container {
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100%;

        h1{
            margin-bottom: 1rem;
            color: wheat;
            text-align: center;
            z-index: 999;
        }

        .balance {
            background: white;
            margin-top: 3rem;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            z-index: 999;
            white-space: nowrap;

            h2 {
                font-size: 1.7rem;
                font-weight: bold;
            }

            p {
                font-weight: 500;
                font-size: 1.5rem;
                color: var(--color-green);
            }
        }
    }

    .stats-con {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;

        .chart-con {
            .amount-con {
                display: flex;
                align-item: center;
                justify-content: space-evenly;
                gap: 0.3rem;
                margin-top: 2rem;
                width: 95%;

                .income, .expense {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 15px;
                    padding: 0.8rem;
                    z-index: 999;
                    white-space: nowrap;
                    overflow: hidden;

                    h2 {
                        font-size: 1.7rem;
                        font-weight: bold;
                    }

                    p {
                        font-weight: 500;
                        font-size: 1.5rem;
                    }
                }
            }
        }

        .history-con {
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }

    @media (max-width: 900px) {
        flex-direction: column;
        justify-content: space-between;
        height: auto;
        margin: 0 auto;

        .chart-container, .stats-con {
            width: 100%;
            overflow: auto;
        }

        .chart-container {
            margin-bottom: 2rem;
        }
    }

    @media (max-width: 600px) {
        .chart-container {
            transform: scale(0.9);
            
            .balance {
                h2 {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                p {
                    font-weight: 500;
                    font-size: 1.3rem;
                    color: var(--color-green);
                }
            }
        }

        .stats-con {
            .chart-con {
                .amount-con {
                    margin-top: 0rem;
                    width: 100%;
                    
                    .income, .expense {
                        h2 {
                            font-size: 1.5rem;
                            font-weight: bold;
                        }

                        p {
                            font-weight: 500;
                            font-size: 1.3rem;
                        }
                    }
                }
            }
        }
    }
`;

export default Dashboard;
