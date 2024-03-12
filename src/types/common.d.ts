interface MenuItem {
  path: string,
  name: string,
  icon?: string,
  [key: string]: any,
}

interface MockItemBasicType {
  mockItemId?: string;
  apiPath?: string;
  apiName?: string;
  apiRemarks?: string;
  requestMethod?: string;
  mockPattern?: string;
}

interface SceneItemType {
  [key: string]: any;
  sceneId: string | number;
  sceneName: string;
  responseConf?: string;
  param?: string;
}

export {
  MenuItem,
  MockItemBasicType,
  SceneItemType,
}
