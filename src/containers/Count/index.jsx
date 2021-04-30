import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { add, clear } from '../../redux/actions/count';

class Count extends Component {
    add = () => {
        // 通知redux
        this.props.add(1);
    };
    clear = () => {
        this.props.clear();
    };
    render() {
        return (
            <Fragment>
                <h2>当前求和为：{this.props.count}</h2>
                <h3>当前Flag：{this.props.flag ? 'true' : 'false'}</h3>
                <button onClick={this.add}>点击+1</button>
                <button onClick={this.clear}>清零</button>
            </Fragment>
        );
    }
}

export default connect(
    // 1.状态
    state => ({ count: state.sum, flag: state.flagState }),
    // 2.方法
    { add, clear }
)(Count);
