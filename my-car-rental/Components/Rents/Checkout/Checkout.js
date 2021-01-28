import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import Spinner from '../../Spinner/Spinner';

import axios from 'axios';

import { connect } from 'react-redux';
import { resetcarType } from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        carType: state.carType,
        totalPayment: state.totalPayment,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetcarType: () => dispatch(resetcarType()),
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        this.setState({ isLoading: true });
        const carTypes = [...this.props.carTypes]
        const carTypeObj = {}
        for (let i of carTypes) {
            carTypeObj[i.type] = i.amount
        }
        const rent = {
            carTypes: carTypeObj,
            customer: this.state.values,
            payment: this.props.totalPayment,
            rentTime: new Date(),
            user: this.props.userId,
        }
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }
        }
        axios.post("http://127.0.0.1:8000/api/order/", rent, header)
            .then(response => {

                if (response.status === 201) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Rent Placed Successfully!",
                    })
                    this.props.resetcarType();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! ",
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Order Again!",
                })
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>Payment: {this.props.totalPrice} BDT</h4>
            <form style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e) => this.inputChangerHandler(e)}></textarea>
                <br />
                <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e) => this.inputChangerHandler(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangerHandler(e)}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button style={{ backgroundColor: "#D70F64" }} className="mr-auto" onClick={this.submitHandler} disabled={!this.props.purchasable}>Rent Now</Button>
                <Button color="secondary" className="ml-1" onClick={this.goBack}>Cancel</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);