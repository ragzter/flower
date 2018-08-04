
const initialState = [
  {
    title: 'Consider',
    id: -2,
    items: [
      {
        title: 'Buy a desk',
        id: -1
      }
    ]
  },
  {
    title: 'Research',
    id: -1,
    items: [
      {
        title: 'Buy a new graphics card',
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
        title: action.title,
        id: action.id
      }
    ]
  case 'REMOVE_BOARD':
    return state.filter(x => x.id !== action.id)
  case 'ADD_ITEM':
    const newState = state.map(board => {
      if (board.id === action.boardId) {
        console.log('found board id')
        const newItems = [
          ...board.items,
          {
            title: action.title,
            id: action.id
          }
        ]

        console.log({
          ...board,
          items: newItems
        })

        return {
          ...board,
          items: newItems
        }
      } else {
        return board
      }
    })

    return newState
  default:
    return state
  }
}

export default boards
