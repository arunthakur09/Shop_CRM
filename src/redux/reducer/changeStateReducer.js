export const initialState = {
    sidebarShow: 'responsive'
  }
  
export default function ChangeState(state = initialState, { type, ...rest }) {
    const newState = {...state}
  switch (type) {
        case 'set':
          newState.sidebarShow = rest.sidebarShow
          return newState
        default:
          return state
      }
  }