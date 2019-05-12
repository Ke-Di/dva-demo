// 这里定义一些需要使用到到通用方法
import Moment from "moment";

export const RedirectToLogin = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

// 与服务端的数据请求，定义一些错误代码，该错误情况下需要退出登录
export let errorCodeQuit = [4001];
const ErrorCodeQuit = new Map()
  .set(4001, "登录失效，请重新登录");

export const ErrorCodeTextQuit = errorCode => {
  return ErrorCodeQuit.get(errorCode) || "出现错误，请重试";
};

// 与服务端的数据请求，定义一些错误代码，该错误情况下不需要退出登录
export let errorCode = [4002, 4203, 5001, 5002];
const ErrorCode = new Map()
  .set(4002, "您无权限访问该功能")
  .set(4203, "对不起，您的权限不够")
  .set(5001, "数据库连接失败，请重试")
  .set(5002, "Rest接口调用失败，请重试");

export const ErrorCodeText = errorCode => {
  return ErrorCode.get(errorCode) || "出现错误，请重试";
};

// 当用户点击某个时间段时，计算出相应的起止时间
export const QueryTime = ["全部", "今天", "昨天", "本周", "本月"];
const QueryTimeMap = new Map()
  .set("全部", ["", ""])
  .set("今天", [
    Moment()
      .startOf("day")
      .valueOf(),
    Moment()
      .endOf("day")
      .valueOf()
  ])
  .set("昨天", [
    Moment()
      .subtract(1, "day")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .valueOf(),
    Moment()
      .subtract(1, "day")
      .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
      .valueOf()
  ])
  .set("本周", [
    Moment()
      .startOf("isoWeek")
      .valueOf(),
    Moment()
      .endOf("isoWeek")
      .valueOf()
  ])
  .set("本月", [
    Moment()
      .startOf("month")
      .valueOf(),
    Moment()
      .endOf("month")
      .valueOf()
  ]);

export const QueryTimeStartEnd = queryTime => {
  return QueryTimeMap.get(queryTime) || ["", ""];
};

// 该方法将标准时间转换为时间戳，如 (Tue Apr 02 2019 11:45:05 GMT+0800 (中国标准时间))
// 或 (Tue Apr 02 2019 11:45:26 GMT+0800 (CST) )
export const dateToUnix = (dateGMT, H = 0, M = 0, S = 0) =>
  Moment(dateGMT)
    .set({ hour: H, minute: M, second: S, millisecond: 0 })
    .valueOf();

// 时间戳转换方法，示例用法：UnixToDate(Time, "YYYY-MM-DD HH:mm:ss")
// 或：UnixToDate(Time)
export let UnixToDate = (unix, format) => {
  if (unix === undefined || unix === null) return null;
  if (unix * 1 <= 0) return null;
  if (format === undefined) format = "YYYY/MM/DD";
  return Moment.unix(unix.toString().substr(0, 10)).format(format);
};

// 关于路由中的查询字符串转换为 query 对象的转换方法
export const QueryParam = search => {
  if (typeof search !== "string" || !search.startsWith("?")) {
    return null;
  }

  let query = {};
  const SearchString = search.substring(1);
  const QueryAry = SearchString.split("&");

  for (let i = 0; i < QueryAry.length; i++) {
    let keyValue = QueryAry[i].split("=");
    query[keyValue[0]] = keyValue[1];
  }
  return query;
};

// 将对象数据转换为 GET 请求方法的拼接字符串
export let getParams = obj => {
  let result = "";
  for (let item in obj) {
    result += "&" + item + "=" + encodeURIComponent(obj[item]);
  }
  if (result) {
    result = "?" + result.slice(1);
  }
  return result;
};

export const RenderFun = (text, record, index) => text || "——";

export const SplitText = (text, Split = "/") => {
  if (!text) {
    return "——";
  }
  let textArray = text.split(Split);
  return textArray.join("\n");
};