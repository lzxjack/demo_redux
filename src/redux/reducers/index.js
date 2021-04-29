// 汇总所有的reducer

import { combineReducers } from 'redux';

import sum from './count';
import flagState from './flag';

export default combineReducers({
    sum,
    flagState,
});
