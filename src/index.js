import "babel-polyfill";
import dva from "dva";
import createHistory from "history/createBrowserHistory";

import count from "./models/count";

import router from "./router";
import "./index.css";

// message 的全局配置和全局销毁方法：
import { message } from "antd";
message.config({
  top: 60,
  duration: 3
});
// message.destroy();

// 1. Initialize
const app = dva({
  // history：指定给路由用的 history，默认是 hashHistory
  // 配置 history 为 browserHistory
  history: createHistory(),
  
  // initialState：指定初始数据，优先级高于 model 中的 state，默认是 {}
  initialState: {
    count: {
      record: 10,
      current: 5
    }
  },

  // effects 和 subscriptions 的抛错全部会走 onError hook，
  // 所以可以在 onError 里统一处理错误。
  onError(e, dispatch) {
    // dispatch({ type: "[modelName]/[dispatchName]" });
    console.error("dva onError", JSON.stringify(e));
  }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(count);

// 4. Router
// app.router(require('./router').default);
app.router(router);

// 5. Start
app.start("#root");
