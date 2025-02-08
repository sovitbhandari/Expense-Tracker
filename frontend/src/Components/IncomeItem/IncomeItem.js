import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeIncome } from '../../redux/store/incomeSlice';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, dollar, food, freelance, medical, money, stocks, takeaway, Delete, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({ id, amount, date, category, indicatorColor }) {
    const dispatch = useDispatch();

    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                console.warn('No matching category:', category);
                return circle; 
        }
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                <h5>{category}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={Delete}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'} 
                            color={'#FF0000'}
                            iColor={'#FF0000'}
                            hColor={'#FF0000'}
                            onClick={() => dispatch(removeIncome(id))}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div`
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 0.8rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    
    .icon{
        width: 80px;
        height: 60px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            color: White;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    opacity: 1;
                }
            }
        }
    }

    @media (max-width: 700px) {
        .content .inner-content .btn-con{
            transform: scale(0.8);
        }
    }
`;

export default IncomeItem;
