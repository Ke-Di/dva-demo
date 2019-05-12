import fetch from "dva/fetch";
import { message } from "antd";
import {
  RedirectToLogin,
  errorCodeQuit,
  ErrorCodeTextQuit,
  errorCode,
  ErrorCodeText
} from "./utilFunction";

const parseJSON = response => {
  return response.json();
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const UserInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
const Authorization = UserInfo.accessToken || "";

const request = async (url, options) => {
  const headersOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization
    }
  };

  return await fetch(`${global.IP_PORT}${url}`, {
    ...headersOptions,
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
    // .then(data => ({ data }))
    // .catch(err => ({ err }));
    .then(data => {
      if (errorCodeQuit.includes(data.status)) {
        message.warning(`${ErrorCodeTextQuit(data.status)}`, () => {
          RedirectToLogin();
        });
      }
      if (errorCode.includes(data.status)) {
        message.warning(`${ErrorCodeText(data.status)}`);
      }
      return { data };
    })
    .catch(err => {
      console.log("request err:", err);
      throw new Error(err);
      return { data: {} };
    });
};

export default request;
