export default {
  components: {
    SearchBar: {
      searchInputPlaceholder: '请输入查询（请求路径、备注）',
      iterativeTagPlaceholder: '迭代期标签',
      searchPatternLabel: '搜索模式',
      mockFromRequestLabel: "是否从请求生成Mock项",
      searchPatternList: {
        path: '路径',
        apiName: '接口名',
        apiRemarks: '接口备注',
        param: '参数'
      },
      formOfDisplay: {
        brief: '精简',
        normal: '标准',
      },
      searchBtn: '查询',
      createNewMockItem: '新建Mock项',
    },
    MockItem: {
      base: {
        apiNameLabel: '接口名',
        apiPathLabel: '请求路径',
        apiRemarksLabel: '接口备注',
        requestMethodLabel: '请求方式',
        mockPatternLabel: 'Mock模式',
        apiTypeLabel: '接口类型',
        mockPatternList: {
          mock: 'Mock',
          request: '真实请求',
          mockJs: 'MockJs',
          'request&create': '请求&创建场景',
        },
      },
      matchedSceneLabel: '匹配到的场景',
      scene: '场景',
      currentMockPatternLabel: '模式',
      param: '参数',
      addScene: '添加场景',
    },

    SettingConf: {
      title: '设置',
      apiList: {
        upload: '上传接口',
        list: '列表接口',
        delete: '删除接口',
        update: '更新接口',
      },
      apiConfig: '接口配置',
    }
  },
  page: {
    HomeView: {
      button: {
        save: '保存',
        saveAndClose: '保存并关闭',
        close: '关闭',
      }
    },
    AssetsManagement: {
      uploadNotice: '拖拽文件到此处，或点击上传',
      panelTitle: {
        default: '资源',
        favorite: '收藏夹',
      },
      addPanelModal: {
        title: '添加面板',
        panelNamePlaceholder: '请输入面板名',
        confirm: '确认',
        cancel: '取消',
        inputErrorMessage: '请输入面板名',
      },
      addToSet: '添加到集合',
      selectPanelTable: {
        panelLabel: '集合名',
      }
    },
  },
  global: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    login: '登录',
    list: '列表',
    get: '获取',
    config: '配置',
    scene: '场景',
    update: '更新',
    delete: '删除',
    success: '成功',
    fail: '失败',
    username: '用户名',
    password: '密码',
    authConf: '认证配置',
    loginApi: '登录接口',
    param: '参数',
    responseConfig: '返回值配置',
    sceneName: '场景名',
    apiName: '接口名',
    apiRemarks: '接口备注',
    iteration: '迭代期',
    systemSetting: '系统设置',
  },
}