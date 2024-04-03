import { defineRequest } from './request';
import JSON5 from 'json5';
import get from 'lodash/get';
import set from 'lodash/set';
import crypto from 'crypto-js';

export const getRequestFormConf = (conf: { 
  api: string, 
  passwordEncryptType?: string,
  salt?: string,
  conf: string, 
  method: string,
  authType?: string 
}, isLogin: boolean = false) => async (param: any) => {
  const confObj = JSON5.parse(conf.conf);
  if(isLogin) {
    const { logInfoMap } = confObj;
    const requestData = {} as any;
    requestData[logInfoMap.username ?? 'username'] = param.username;
    // @ts-ignore
    requestData[logInfoMap.password ?? 'password'] = crypto?.[conf.passwordEncryptType](param.password, conf.salt).toString();
    return await defineRequest(conf.api, conf.method)(requestData);
  } else {
    const paramMap: Record<string, string> = confObj?.req?.map ?? {};
    const resultMap: Record<string, string> = confObj?.res?.map ?? {};
    const requestData = {} as Record<string, string>;
    if(Object.keys(paramMap).length) {
      Object.entries(paramMap).forEach(([key, value]) => {
        set(requestData, value, param[key]);
      });
    }

    const res = await defineRequest(conf.api, conf.method)(requestData);

    const resultData = {} as any;
    if(Object.keys(resultMap).length) {
      Object.entries(resultMap).forEach(([key, value]) => {
        if(get(res, value) !== undefined)
          resultData[key] = get(res, value);
      });
    }

    // 如果有这个字段则说明返回的是列表
    if(resultMap.total) {
      const listItemMap: Record<string, string> = confObj?.res?.itemMap ?? {};
      if(Object.keys(listItemMap).length) {
        resultData.list = resultData.list.map((item: any) => {
          const itemData = {} as any;
          Object.entries(listItemMap).forEach(([key, value]) => {
            if(get(item, value) !== undefined)
              itemData[key] = get(item, value);
          });
          return itemData;
        });
      }
    }

    return resultData;
  }
}