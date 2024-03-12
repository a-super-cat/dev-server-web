import {defineRequest} from '@/utils/request';
const systemApiPrefix = '/mock-system';

export const login = defineRequest(`${systemApiPrefix}/login`, 'POST');

// 获取mock列表
export const getMockList = defineRequest(`${systemApiPrefix}/getMockList`, 'GET');

export const saveSceneItem = defineRequest(`${systemApiPrefix}/saveSceneItem`, 'POST');

export const testApi = defineRequest(`${systemApiPrefix}/test`, 'GET');
