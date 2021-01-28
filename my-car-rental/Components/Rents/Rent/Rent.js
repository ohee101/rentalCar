import React from 'react';

const Rent = props => {
    const carTypeObj = props.rent.carTypes;
    const carTypes = []
    for (let [key, value] of Object.entries(carTypeObj)) {
        carTypes.push({ type: key, amount: value })
    }
    const carSummary = carTypes.map(item => {
        return (
            <span style={{
                border: "1px solid grey",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "10px",
            }} key={item.type}>{item.amount}x <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
        )
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px",
        }}>
            <p>Rent Number: {props.rent.id}</p>
            <p>Delivery Address: {props.rent.customer.deliveryAddress}</p>
            <hr />
            {carSummary}
            <hr />
            <p>Total: {props.rent.price} BDT</p>
        </div>
    )
}

export default Rent;
