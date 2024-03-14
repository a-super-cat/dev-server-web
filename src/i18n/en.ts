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
      createNewMockItem: 'Create New MockItem',
    },
    MockItem: {
      base: {
        apiNameLabel: 'Api Name',
        apiPathLabel: 'Api Path',
        apiRemarksLabel: 'Api Remarks',
        requestMethodLabel: 'Request Method',
        mockPatternLabel: 'Mock Pattern',
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