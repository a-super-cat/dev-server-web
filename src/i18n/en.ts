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
    iteration: 'Iteration',
  },
}