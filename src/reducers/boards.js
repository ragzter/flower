
// const initialState = [
//   {
//     title: 'Consider',
//     id: -2,
//     items: [
//       {
//         title: 'Buy a desk',
//         id: -1
//       }
//     ]
//   },
//   {
//     title: 'Research',
//     id: -1,
//     items: [
//       {
//         title: 'Buy a new graphics card',
//         id: -1
//       }
//     ]
//   }
// ]

const initialState = JSON.parse(localStorage.getItem('state'))

const boards = (state = initialState, action) => {
  let newState

  switch (action.type) {
  case 'ADD_BOARD':
    newState = [
      ...state,
      {
        title: action.title,
        id: action.id
      }
    ]

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  case 'REMOVE_BOARD':
    newState = state.filter(x => x.id !== action.id)

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  case 'ADD_ITEM':
    newState = state.map(board => {
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

    localStorage.setItem('state', JSON.stringify(newState))
    return newState
  default:
    return state
  }
}

export default boards
