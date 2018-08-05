
// const initialState = [
//   {
//     title: 'Consider',
//     id: -2,
//     items: [
//       {
//         title: 'Buy a desk',
//         id: -2
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
        const newItems = [
          ...board.items,
          {
            title: action.title,
            id: action.id
          }
        ]

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
  case 'REMOVE_ITEM':
    newState = state.map(board => {
      return {
        ...board,
        items: board.items.filter(item => item.id !== action.id)
      }
    })

    localStorage.setItem('state', JSON.stringify(newState))
    return newState
  case 'MOVE_ITEM_TO_NEXT_BOARD':
    let storedItem

    newState = state.map(board => {
      if (board.items) {
        board.items.map(item => {
          if (item.id === action.id) {
            console.log('storing item:')
            storedItem = item
            console.log(storedItem)
          }
        })
      }

      let newItems = board.items ? board.items.filter(item => item.id !== action.id) : []

      if (storedItem && newItems.length === board.items.length) {

        console.log('stored item found')
        console.log('newItems:')

        console.log(newItems)
        newItems = [
          ...newItems,
          storedItem
        ]

        console.log('newItems (after interpolation):')
        console.log(newItems)

        storedItem = null
      }

      return {
        ...board,
        items: newItems
      }
    })

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  default:
    return state
  }
}

export default boards
