import React, { Component } from 'react';
import car from './car/car';
import Controls from './Controls/Controls';
import Summary from '../Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { addcarType, removecarType, updatePurchasable } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        carTypes: state.carTypes,
        totalPayment: state.totalPayment,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addcarType: (igtype) => dispatch(addcarType(igtype)),
        removecarType: (igtype) => dispatch(removecarType(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}

class carRent extends Component {
    state = {
        modalOpen: false,
    }

    addcarTypeHandle = type => {
        this.props.addcarType(type);
        this.props.updatePurchasable();
    }

    removecarTypeHandle = type => {
        this.props.removecarType(type);
        this.props.updatePurchasable();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.props.history.push("/checkout");
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <car carType={this.props.carType} />
                    <Controls
                        carTypeAdded={this.addcarTypeHandle}
                        carTypeRemoved={this.removecarTypeHandle}
                        payment={this.props.totalPayment}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Rent Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Payment: {this.props.totalPayment.toFixed(0)} BDT</h5>
                        <Summary carType={this.props.carType} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(carRent);