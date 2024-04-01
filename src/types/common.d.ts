import { mockPatternList, requestMethodList, apiTypeList, wsMessageTypeList } from '@/utils/constants'

type apiType = typeof apiTypeList[number];
type mockPatternType = typeof mockPatternList[number];
type requestMethodType = typeof requestMethodList[number];
type wsMessageTypeType = typeof wsMessageTypeList[number];
interface MenuItem {
  path: string,
  name: string,
  icon?: string,
  [key: string]: any,
}

interface MockItemBasicType {
  id: string;
  path?: string;
  type:  apiType;
  name?: string;
  remarks?: string;
  requestMethod?: requestMethodType;
  mockPattern?: mockPatternType;
}

interface SceneItemType {
  [key: string]: any;
  id: string | number;
  name: string;
  responseConf?: string;
  param?: string;
}

interface MockItemMatchedInfoType {
  [mockItemId: string] : {
    sceneName: string;
    param: string;
  }
}

interface AssetsItemType {
  name: string, 
  url: string, 
  extension: string, 
  isFavorited?: boolean, 
  fileSet?: string[],
}

export {
  MenuItem,
  MockItemBasicType,
  SceneItemType,
  wsMessageTypeType,
  MockItemMatchedInfoType,
  AssetsItemType,
}
