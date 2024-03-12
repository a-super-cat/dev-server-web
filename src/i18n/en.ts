export default {
  components: {
    SearchBar: {
      searchInputPlaceholder: 'please input text for search (eg: apiPath、comment、param)',
      iterativeTagPlaceholder: 'select iterative tag',
      searchPatternLabel: 'searchPattern',
      searchPatternList: {
        path: 'path',
        apiName: 'apiName',
        apiRemarks: 'apiRemarks',
        param: 'param'
      },
      searchBtn: 'search',
    },
    MockItem: {
      base: {
        apiNameLabel: 'apiName',
        apiPathLabel: 'apiPath',
        requestMethodLabel: 'requestMethod',
        mockPatternLabel: 'mockPattern',
        mockPatternList: {
          mock: 'Mock',
          request: 'realRequest',
          mockJs: 'MockJs',
        },
      },
      scene: 'scene',
      currentMockPatternLabel: 'pattern',
      param: 'param',
      addScene: 'Add Scene',
    },
  },
  page: {
    HomeView: {
      button: {
        save: 'Save',
        saveAndClose: 'Save & Close',
        close: 'Close',
      }
    }
  },
  global: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    param: 'param',
    responseConfig: 'responseConfig',
    sceneName: 'scene name',
  },
}