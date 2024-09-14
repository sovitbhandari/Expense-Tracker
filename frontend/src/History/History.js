import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    // Access the recent transactions from the global context
    const { recentTransactions } = useGlobalContext();

    // Get the list of recent transactions
    const history = recentTransactions();

    return (
        <HistoryStyled>
    <h2>Recent Transactions</h2>
    {history.map((transaction) => {
        const { _id, category, amount, type } = transaction;
        return (
            <div key={_id} className="history-item">
                <p
                    style={{
                        color: type === 'expense' ? 'red' : 'var(--color-green)',
                    }}
                >
                    {category}
                </p>

                <p
                    style={{
                        color: type === 'expense' ? 'red' : 'var(--color-green)',
                    }}
                >
                    {type === 'expense'
                        ? `-${Math.abs(amount).toLocaleString()}`
                        : `+${amount.toLocaleString()}`}
                </p>
            </div>
        );
    })}
</HistoryStyled>

)

}

// Styled-component for History section styling
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 95%;

    h2 {
        color: wheat;
        z-index: 999;
    }

    .history-item {
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        transition: background-color 0.3s ease;
    }

    @media (max-width: 900px) { 
        width: 100%;
    }
`;

export default History;
