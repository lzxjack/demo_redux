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

# 4. 详细代码