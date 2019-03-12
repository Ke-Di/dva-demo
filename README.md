[toc]

# Dva Demo Count

这个 Demo 来自 dva 脚手架的[参考文档](https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/getting-started.md)

## 快速开始

克隆项目文件:

```ssh
git clone git@github.com:Ke-Di/dva-demo-count.git
```

进入目录安装依赖:

开始前请确保没有安装roadhog、webpack到NPM全局目录, 国内用户推荐yarn或者cnpm

```ssh
yarn 或者 npm i
```

开发：

```ssh
yarn start 或者 npm run start
打开 http://localhost:8000 #端口在package.json中cross-env后加上 PORT=8000指定
```

## React 没有解决的问题

`React` 本身只是一个 `DOM` 的抽象层，使用组件构建虚拟 `DOM`。

如果开发大应用，还需要解决以下问题：

- 通信：组件之间如何通信？
- 数据流：数据如何和视图串联起来？路由和数据如何绑定？如何编写异步逻辑？等等

### 通信问题

组件会发生三种通信：

1. 向子组件发消息
2. 向父组件发消息
3. 向其他组件发消息

React 只提供了一种通信手段：传参。对于大应用，很不方便。

### 数据流问题

目前流行的数据流方案有：

1. `Flux`，单向数据流方案，以 `Redux` 为代表
2. `Reactive`，响应式数据流方案，以 `Mobx` 为代表
3. 其他，比如 `rxjs` 等

到底哪一种架构最合适 `React` ？

目前最流行的数据流方案，截止 2017.1，最流行的社区 `React` 应用架构方案如下：

- 路由： `React-Router`
- 架构： `Redux`
- 异步操作： `Redux-saga`

缺点：要引入多个库，项目结构复杂。

## dva 是什么

`dva` 是体验技术部开发的 `React` 应用框架，将上面三个 `React` 工具库包装在一起，简化了 API，让开发 `React` 应用更加方便和快捷。

```
dva = React + React-Router + Redux + Redux-saga
```

### 核心概念

- `State`：一个对象，保存整个应用状态
`State` 是储存数据的地方，收到 `Action` 以后，会更新数据。
- `View`：`React` 组件构成的视图层
`View` 就是 React 组件构成的 UI 层，从 `State` 取数据后，渲染成 HTML 代码。只要 State 有变化，`View` 就会自动更新。
- `Action`：一个对象，描述事件
`Action` 是用来描述 UI 层事件的一个对象。
```js
{
  type: 'click-submit-button',
  payload: this.form.data
}
```
- `connect` 方法：一个函数，绑定 `State` 到 `View`
`connect` 是一个函数，绑定 `State` 到 `View`。
`connect` 方法返回的也是一个 `React` 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 `State`。
`connect` 方法传入的第一个参数是 `mapStateToProps` 函数，`mapStateToProps` 函数会返回一个对象，用于建立 `State` 到 `Props` 的映射关系。
```js
import { connect } from 'dva';

const mapStateToProps = (state) => {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```
- `dispatch` 方法：一个函数，发送 `Action` 到 `State`
`dispatch` 是一个函数方法，用来将 `Action` 发送给 `State`。
`dispatch` 方法从哪里来？被 `connect` 的 `Component` 会自动在 `props` 中拥有 `dispatch` 方法。
```js
dispatch({
  type: 'click-submit-button',
  payload: this.form.data
})
```

### app.model

`dva` 提供 `app.model` 这个对象，所有的应用逻辑都定义在它上面。

```js
const app = dva();

// 新增这一行
app.model({ /**/ });

app.router(() => <App />);
app.start('#root');
```

- `Model` 对象的例子

```js
app.model({
  namespace: 'count',
  
  state: {
    record: 0,
    current: 0,
  },
  
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return { ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    },
  },
  
  effects: {
    *add(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
  
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  },
});

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
```

- `Model` 对象的属性

1. `namespace`: 当前 `Model` 的名称。整个应用的 `State`，由多个小的 `Model` 的 `State` 以 `namespace` 为 `key` 合成
2. `state`: 该 `Model` 当前的状态。数据保存在这里，直接决定了视图层的输出
3. `reducers`: `Action` 处理器，处理同步动作，用来算出最新的 `State`
4. `effects`：`Action` 处理器，处理异步动作
5. `*add() {}` 等同于 `add: function*(){}`
6. `call` 和 `put` 都是 `redux-saga` 的 `effects`，`call` 表示调用异步函数，`put` 表示 dispatch action，其他的还有 `select`, `take`, `fork`, `cancel` 等，详见 [redux-saga 文档](https://github.com/superRaytin/redux-saga-in-chinese)
7. 默认的 `effect` 触发规则是每次都触发(`takeEvery`)，还可以选择 `takeLatest`，或者完全自定义 `take` 规则
8. `Subscription` 语义是订阅，用于订阅一个数据源，然后根据条件 `dispatch` 需要的 `action`。数据源可以是当前的时间、服务器的 `websocket` 连接、`keyboard` 输入、`geolocation` 变化、`history` 路由变化等等。

- `Model` 对象的优点

1. 把 `store` 及 ``saga` 统一为一个 `model` 的概念, 写在一个 js 文件里面
2. 增加了一个 `Subscriptions`, 用于收集其他来源的 `action`, eg: 键盘操作
3. `model` 写法很简约, 类似于 DSL 或者 RoR, coding 快得飞起✈️

## 参考文档

- [DvaJS - React and redux based, lightweight and elm-style framework](https://dvajs.com/)
- [DvaJS 知识地图](https://dvajs.com/knowledgemap/)
- [Dva 快速上手](https://dvajs.com/guide/getting-started.html)
- [Dva 概念](https://dvajs.com/guide/concepts.html)
- [Dva API](https://dvajs.com/api/)
- [Dva 入门课](https://dvajs.com/guide/introduce-class.html#react-%E6%B2%A1%E6%9C%89%E8%A7%A3%E5%86%B3%E7%9A%84%E9%97%AE%E9%A2%98)
- [Dva 图解](https://dvajs.com/guide/fig-show.html#%E7%A4%BA%E4%BE%8B%E8%83%8C%E6%99%AF)
- [使用 Dva 开发复杂 SPA](https://dvajs.com/guide/develop-complex-spa.html)
- [Dva 源码解析](https://dvajs.com/guide/source-code-explore.html#%E9%9A%90%E8%97%8F%E5%9C%A8-package-json-%E9%87%8C%E7%9A%84%E7%A7%98%E5%AF%86)
- [redux docs](https://redux.js.org/introduction/getting-started)
- [Redux 中文文档](http://cn.redux.js.org/index.html)
- [Mostly adequate guide to FP (in javascript)](https://github.com/MostlyAdequate/mostly-adequate-guide)
- [JS 函数式编程指南](https://legacy.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)
