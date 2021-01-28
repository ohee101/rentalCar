import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRents } from '../../redux/actionCreators';

import Rent from './Rent/Rent';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        rents: state.rents,
        rentLoading: state.rentLoading,
        rentErr: state.rentErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRents: (token, userId) => dispatch(fetchRents(token, userId)),
    }
}

class Rents extends Component {
    componentDidMount() {
        this.props.fetchRents(this.props.token, this.props.userId);
    }
    render() {
        let rents = null;
        if (this.props.rentErr) {
            rents = <p style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
            }}>Sorry Failed to Load Rents!</p>
        } else {
            if (this.props.rents.length === 0) {
                rents = <p style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "10px",
                }}>You have no Rents!</p>
            } else {
                rents = this.props.rents.map(rent => {
                    return <Rent rent={rent} key={rent.id} />
                })
            }

        }
        return (
            <div>
                {this.props.rentLoading ? <Spinner /> : rents}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rents);