import React from 'react';

const Summary = props => {
    const rentSummary = props.carTypes.map(item => {
        return (
            <li key={item.type}>
                <span style={{ textTransform: "capitalize" }}>{item.type}</span>: {item.amount}
            </li>
        )
    })
    return (
        <div>
            <ul>
                {rentSummary}
            </ul>
        </div>
    )
}

export default Summary;