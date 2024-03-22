import {defineRequest} from '@/utils/request';
const systemApiPrefix = '/mock-system';

export const login = defineRequest(`${systemApiPrefix}/login`, 'POST');

// 搜索 & 获取mockItem列表
export const search = defineRequest(`${systemApiPrefix}/search`, 'POST');
// 获取迭代期列表
export const getIterationList = defineRequest(`${systemApiPrefix}/getIterationList`, 'GET');
// 保存迭代期列表
export const saveIterationList = defineRequest(`${systemApiPrefix}/saveIterationList`, 'POST');

// mockItem操作
export const saveMockItem = defineRequest(`${systemApiPrefix}/saveMockItem`, 'POST');

// 删除mockItem
export const deleteMockItem = defineRequest(`${systemApiPrefix}/deleteMockItem`, 'POST');

// 获取场景详情 不含返回值配置
export const saveSceneItem = defineRequest(`${systemApiPrefix}/saveSceneItem`, 'POST');
// 获取场景对应的返回值配置
export const getSceneItemResponseConf = defineRequest(`${systemApiPrefix}/getSceneItemOne`, 'POST');
// 删除场景
export const deleteSceneItem = defineRequest(`${systemApiPrefix}/deleteSceneItem`, 'POST');
// 选中场景
export const selectSceneItem = defineRequest(`${systemApiPrefix}/selectSceneItem`, 'POST');

export const testApi = defineRequest(`${systemApiPrefix}/test`, 'GET');
