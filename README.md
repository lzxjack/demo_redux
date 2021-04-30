# 1. 实现效果

![](https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210430144621.gif)

上面是`Count`组件，下面是`Flag`组件。

`Count`组件中，点击`点击+1`按钮，数值加一，点击`清零`按钮，数值清零，同时数值传递给`Flag`组件同步显示。

`Flag`组件中，点击`login`可以切换为`true`，点击`logout`切换为`false`，同时将状态传递给`Count`组件同步显示。

# 2. 安装依赖包

```powershell
npm install react-redux redux redux-thunk redux-devtools-extension
```

# 3. 文件结构

![](https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210430150047.png)

使用了`redux`，需要在`UI组件`外套一层`容器组件`。由于是父子关系，`容器组件`通过`props`向里层的`UI组件`传递参数，将`容器组件`放在`containers`文件夹下。

使用`redux`，需要单独创建`redux`文件夹，包括`actions`文件夹和`reducers`文件夹，还有向外暴露常量的`constant.js`和`store.js`。

# 4. 详细代码

## 1. Count 组件

（1）组件定义

通过`class`定义的是`UI组件`，向外暴露的是`容器组件`，`容器组件`通过`props`向`UI组件`传递**状态**和**方法**。

```javascript
// src/containers/Count/index.jsx
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { add, clear } from '../../redux/actions/count';

// UI组件
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

// 暴露容器组件
export default connect(
    // 1.状态
    state => ({ count: state.sum, flag: state.flagState }),
    // 2.方法
    { add, clear }
)(Count);
```

（2）创建`action`

该文件用于创建`action`对象。

```javascript
// src/redux/actions/count.js
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
```

（3）`reducer`

该文件用于判断`type`的类型，加工数据。

```javascript
// src/redux/reducers/count.js
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
```

## 2. Flag 组件

（1）组件定义

```javascript
// src/containers/Flag/index.jsx
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
```

（2）创建`action`

```javascript
// src/redux/actions/flag.js
// 为Flag组件创建action对象

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
```

（3）`reducer`

```javascript
// src/redux/reducers/flag.js
//  reducer接收两个参数：之前状态的preState，动作对象action

import { LOGIN, LOGOUT } from '../constant.js';

// 设定初始状态
const initState = false;

export default function addReducer(preState = initState, action) {
    const { type } = action;
    switch (type) {
        case LOGIN:
            return true;
        case LOGOUT:
            return false;
        default:
            return preState;
    }
}
```

## 3. 汇总所有 reducer

所有的组件的`reducer`要汇总到一个文件中，并向外暴露`redux`中存放的状态**对象**。

```javascript
// src/redux/reducers/index.js
// 汇总所有的reducer

import { combineReducers } from 'redux';

import sum from './count';
import flagState from './flag';

export default combineReducers({
    sum,
    flagState,
});
```

## 4. 常量文件

```javascript
// src/redux/constant.js
export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const ADD = 'add';
export const CLEAR = 'clear';
```

## 5. store

引入汇总后的`rudecer`，暴露`store`。

```javascript
// src/redux/store.js
// 整个文档只有一个store对象

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allRudecers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// 暴露store
export default createStore(allRudecers, composeWithDevTools(applyMiddleware(thunk)));
```

## 6. 项目入口文件 index.js

引入`store`，并将`<App />`用`<Provider store={store}></Provider>`包裹，这样`<App />`下所有的组件都能接收到`store`了。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    // Provider包裹App，目的：让App所有的后代容器组件都能接收到store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

