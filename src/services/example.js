import request from "../utils/request";

export const fetch = async param => {
  return request(param.url, param.options);
};
