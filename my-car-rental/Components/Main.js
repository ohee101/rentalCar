import React, { Component } from 'react';
import Header from './Header/Header';
import carRent from './carRent/carRent';
import Rents from './Rents/Rents';
import Checkout from './Rents/Checkout/Checkout';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';

import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/rents" component={Rents} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/" exact component={carRent} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>
            </div>
        )
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(Main);