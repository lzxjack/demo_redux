import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/actions/flag';

class Flag extends Component {
    login = () => {
        this.props.login();
    };
    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <Fragment>
                <h2>当前Flag：{this.props.flag ? 'true' : 'false'}</h2>
                <h3>当前求和为：{this.props.count}</h3>
                <button onClick={this.login}>login</button>
                <button onClick={this.logout}>logout</button>
            </Fragment>
        );
    }
}

export default connect(state => ({ flag: state.flagState, count: state.sum }), { login, logout })(
    Flag
);
