import {defineRequest} from '@/utils/request';
const systemApiPrefix = '/mock-system';

export const login = defineRequest(`${systemApiPrefix}/login`, 'POST');

// 设置保存页面配置
export const setPageSetting = defineRequest(`${systemApiPrefix}/savePageSetting`, 'POST');

// 获取页面配置
export const getPageSetting = defineRequest(`${systemApiPrefix}/getPageSetting`, 'GET');

// 是否从请求中创建mockItem
export const isCreateMockItemFromRequest = defineRequest(`${systemApiPrefix}/isCreateMockItemFromRequest`, 'GET');
// 获取是否从请求中创建mockItem的布尔值
export const getIsCreateMockItemFromRequest = defineRequest(`${systemApiPrefix}/flagForIsCreateMockItemFromRequest`, 'GET');

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

// 获取静态资源列表
export const getAssetsList = defineRequest(`${systemApiPrefix}/getAssetsList`, 'GET');
// 保存静态资源列表
export const saveAssetsItem = defineRequest(`${systemApiPrefix}/saveAssetsList`, 'POST');

// 获取静态资源集列表
export const getAssetsSetList = defineRequest(`${systemApiPrefix}/getAssetsSetList`, 'GET');
// 保存静态资源集列表
export const saveAssetsSetList = defineRequest(`${systemApiPrefix}/saveAssetsSetList`, 'POST');
