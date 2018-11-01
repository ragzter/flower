
const storedState = JSON.parse(localStorage.getItem('state'))

const initialState = storedState ? storedState : []

const boards = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_BOARD':
    let newState = [
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
        const items = board.items ? board.items : []
        const newItems = [
          ...items,
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
        items: board.items ? board.items.filter(item => item.id !== action.id) : []
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
            storedItem = item
          }
        })
      }

      let newItems = board.items ? board.items.filter(item => item.id !== action.id) : []

      if (storedItem && newItems.length === (board.items ? board.items.length : 0)) {

        newItems = [
          ...newItems,
          storedItem
        ]

        storedItem = null
      }

      return {
        ...board,
        items: newItems
      }
    })

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  case 'RENAME_BOARD':
    newState = state.map(board => {
      if (board.id === action.id) {
        return {
          ...board.id,
          title: action.title
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
