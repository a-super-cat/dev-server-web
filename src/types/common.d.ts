interface MenuItem {
  path: string,
  name: string,
  icon?: string,
  [key: string]: any,
}

interface MockItemBasicType {
  id: string;
  path?: string;
  name?: string;
  remarks?: string;
  requestMethod?: string;
  mockPattern?: string;
}

interface SceneItemType {
  [key: string]: any;
  id: string | number;
  name: string;
  responseConf?: string;
  param?: string;
}

export {
  MenuItem,
  MockItemBasicType,
  SceneItemType,
}
