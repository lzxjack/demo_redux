// 引入常量
import { LOGIN, LOGOUT } from '../constant';

// 创建加一action对象的函数
export const login = data => ({
    type: LOGIN,
    data,
});

// 创建加一action对象的函数
export const logout = data => ({
    type: LOGOUT,
    data,
});
