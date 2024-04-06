export default {
  components: {
    SearchBar: {
      searchInputPlaceholder: 'please input text for search (apiPath、remarks)',
      iterativeTagPlaceholder: 'select iterative tag',
      searchPatternLabel: 'searchPattern',
      mockFromRequestLabel: "generate mock item from request?",
      searchPatternList: {
        path: 'path',
        apiName: 'apiName',
        apiRemarks: 'apiRemarks',
        param: 'param'
      },
      formOfDisplay: {
        brief: 'brief',
        normal: 'normal',
      },
      searchBtn: 'search',
      createNewMockItem: 'Create New MockItem',
    },
    MockItem: {
      base: {
        apiNameLabel: 'Api Name',
        apiPathLabel: 'Api Path',
        apiRemarksLabel: 'Api Remarks',
        requestMethodLabel: 'Request Method',
        mockPatternLabel: 'Mock Pattern',
        apiTypeLabel: 'Api Type',
        mockPatternList: {
          mock: 'Mock',
          request: 'realRequest',
          mockJs: 'MockJs',
          'request&create': 'Request&CreateScene',
        },
      },

      matchedSceneLabel: 'Matched Scene',
      scene: 'scene',
      currentMockPatternLabel: 'pattern',
      param: 'param',
      addScene: 'Add Scene',
    },
    SettingConf: {
      title: 'Setting',
      apiList: {
        upload: 'Upload Api',
        list: 'List Api',
        delete: 'Delete Api',
        update: 'Update Api',
      },
      apiConfig: 'Api Config',
    }
  },
  page: {
    HomeView: {
      button: {
        save: 'Save',
        saveAndClose: 'Save & Close',
        close: 'Close',
      }
    },
    AssetsManagement: {
      uploadNotice: 'Drop files here or click to upload',
      panelTitle: {
        default: 'Assets',
        favorite: 'Favorite',
      },
      addPanelModal: {
        title: 'Add Panel',
        panelNamePlaceholder: 'Please input panel name',
        confirm: 'Confirm',
        cancel: 'Cancel',
        inputErrorMessage: 'Please input panel name',
      },
      addToSet: 'Add to Set',
      selectPanelTable: {
        panelLabel: 'Set Name',
      }
    },
  },
  global: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    login: 'Login',
    list: 'List',
    get: 'Get',
    config: 'Config',
    scene: 'Scene',
    save: 'Save',
    update: 'Update',
    delete: 'Delete',
    success: 'Success',
    fail: 'Fail',
    username: 'Username',
    password: 'Password',
    authConf: 'Auth Conf',
    loginApi: 'Login Api',
    param: 'param',
    responseConfig: 'responseConfig',
    sceneName: 'scene name',
    iteration: 'Iteration',
    systemSetting: 'System Setting',
  },
}