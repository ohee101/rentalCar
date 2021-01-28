import React from 'react';
import './car.css';
import CarType from '../CarType/CarType';

const car = props => {
    let carTypeArr = props.carTypes.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <CarType type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element);
        }, []);

    if (carTypeArr.length === 0) {
        carTypeArr = <p>Please select a car to rent!</p>;
    }
    return (
        <div className="CarRent">
            <CarType type="car1" />
            {carTypeArr}
            <CarType type="car2" />
        </div>
    )
}

export default car;