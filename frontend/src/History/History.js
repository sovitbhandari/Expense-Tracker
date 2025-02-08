import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function History() {
    // Get recent transactions from Redux store
    const { incomes } = useSelector((state) => state.income);
    const { expenses } = useSelector((state) => state.expense);

    // Combine and sort transactions by date
    const history = [...incomes, ...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort descending by date
        .slice(0, 5); // Limit to recent 5 transactions

    return (
        <HistoryStyled>
            <h2>Recent Transactions</h2>
            {history.length > 0 ? (
                history.map(({ _id, category, amount, type }) => (
                    <div key={_id} className="history-item">
                        <p style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                            {category}
                        </p>
                        <p style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                            {type === 'expense' ? `-${Math.abs(amount).toLocaleString()}` : `+${amount.toLocaleString()}`}
                        </p>
                    </div>
                ))
            ) : (
                <p className="no-transactions">No recent transactions.</p>
            )}
        </HistoryStyled>
    );
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

    .no-transactions {
        text-align: center;
        color: gray;
    }

    @media (max-width: 900px) { 
        width: 100%;
    }
`;

export default History;
