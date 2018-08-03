
const initialState = [
  {
    name: 'Consider',
    id: -2,
    items: [
      {
        name: 'Buy a desk',
        id: -1
      }
    ]
  },
  {
    name: 'Research',
    id: -1,
    items: [
      {
        name: 'Buy a new graphics card',
        id: -1
      }
    ]
  }
]

const boards = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_BOARD':
    return [
      ...state,
      {
        name: action.name,
        id: action.id
      }
    ]
  case 'REMOVE_BOARD':
    return state.filter(x => x.id !== action.id)
  default:
    return state
  }
}

export default boards
