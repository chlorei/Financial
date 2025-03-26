interface SettingsAction {
    type: string
    payload: string
  }
  

  const defaultState = {
    baseCurrency: 'USD',
  }
  
  export const settingsReducer = (state = defaultState, action: SettingsAction) => {
    switch (action.type) {
      case 'SET_BASE_CURRENCY':
        return {
          ...state,
          baseCurrency: action.payload,
        }
      default:
        return state
    }
  }
  
  export const setBaseCurrency = (currency: string) => ({
    type: 'SET_BASE_CURRENCY',
    payload: currency,
  })