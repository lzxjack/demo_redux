// 为Count组件创建action对象

// 引入常量
import { ADD, CLEAR } from '../constant';

// 创建加一action对象的函数
export const add = data => ({
    type: ADD,
    data,
});

// 创建清零action对象的函数
export const clear = data => ({
    type: CLEAR,
    data,
});
