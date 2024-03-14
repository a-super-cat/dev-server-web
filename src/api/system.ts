import {defineRequest} from '@/utils/request';
const systemApiPrefix = '/mock-system';

export const login = defineRequest(`${systemApiPrefix}/login`, 'POST');

// mockItem操作
export const saveMockItem = defineRequest(`${systemApiPrefix}/saveMockItem`, 'POST');

// 获取mock列表
export const getMockList = defineRequest(`${systemApiPrefix}/getMockItemList`, 'GET');

export const saveSceneItem = defineRequest(`${systemApiPrefix}/saveSceneItem`, 'POST');

export const testApi = defineRequest(`${systemApiPrefix}/test`, 'GET');
