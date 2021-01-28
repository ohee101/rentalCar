import React from 'react';
import './CarType.css';
import car1 from '../../../assets/images/car1.jpeg';
import car2 from '../../../assets/images/car2.jpeg';
import car3 from '../../../assets/images/car3.jpeg';
import car4 from '../../../assets/images/car4.jpeg';
import car5 from '../../../assets/images/car5.jpeg';


const CarType = props => {
    let carType = null;

    switch (props.type) {
        case 'car1':
            carType = <div><img src={car1} alt="car1" /></div>;
            break;
        case 'car2':
            carType = <div><img src={car2} alt="car2" /></div>;
            break;
        case 'car3':
            carType = <div><img src={car3} alt="car3" /></div>;
            break;
        case 'car4':
            carType = <div><img src={car4} alt="car4" /></div>;
            break;
        case 'car5':
            carType = <div><img src={car5} alt="car5" /></div>;
            break;
        default:
            carType = null;
    }
    return (
        <div className="CarType">
            {carType}
        </div>
    )
}

export default CarType;