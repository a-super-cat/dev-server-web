export default {
  components: {
    SearchBar: {
      searchInputPlaceholder: '请输入查询（例如：请求路径、备注、参数）',
      iterativeTagPlaceholder: '迭代期标签',
      searchPatternLabel: '搜索模式',
      searchPatternList: {
        path: '路径',
        apiName: '接口名',
        apiRemarks: '接口备注',
        param: '参数'
      },
      searchBtn: '查询',
    },
    MockItem: {
      base: {
        apiNameLabel: '接口名',
        apiPathLabel: '请求路径',
        requestMethodLabel: '请求方式',
        mockPatternLabel: 'Mock模式',
        mockPatternList: {
          mock: 'Mock',
          request: '真实请求',
          mockJs: 'MockJs',
        },
      },
      scene: '场景',
      currentMockPatternLabel: '模式',
      param: '参数',
      addScene: '添加场景',
    },
  },
  page: {
    HomeView: {
      button: {
        save: '保存',
        saveAndClose: '保存并关闭',
        close: '关闭',
      }
    }
  },
  global: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    param: '参数',
    responseConfig: '返回值配置',
    sceneName: '场景名',
  },
}