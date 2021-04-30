// 为Count组件创建一个reducer
// reducer接收两个参数：之前状态的preState，动作对象action

import { ADD, CLEAR } from '../constant.js';

// 设定初始状态
const initState = 0;

export default function addReducer(preState = initState, action) {
    // 从action中获取type和data
    const { type, data } = action;
    // 根据type决定如何加工数据
    switch (type) {
        case ADD:
            return preState + data;
        case CLEAR:
            return 0;
        // 初始化动作
        default:
            return preState;
    }
}
