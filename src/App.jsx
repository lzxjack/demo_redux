import React, { Component, Fragment } from 'react';
import Count from './containers/Count';
import Flag from './containers/Flag';

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Count />
                <hr />
                <Flag />
            </Fragment>
        );
    }
}
