import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

const controls = [
    { label: 'Private', type: 'private' },
    { label: 'Micro', type: 'micro' },
    { label: 'Jeep', type: 'jeep' },
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Hour</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>Day</button>
        </div>
    )
}


const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}><h4>Select Car</h4></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.carTypeAdded(item.type)}
                                removed={() => props.carTypeRemoved(item.type)}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: <strong>{props.price}</strong> BDT</h5></CardFooter>
                <Button style={{ backgroundColor: "#D70F64" }} disabled={!props.purchasable} onClick={props.toggleModal}>Rent Now</Button>
            </Card>
        </div>
    )
}

export default Controls;