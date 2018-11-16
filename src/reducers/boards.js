
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
  case 'RENAME_BOARD':
    newState = state.map(board => {
      if (board.id === action.id) {
        return {
          ...board,
          title: action.title
        }
      } else {
        return board
      }
    })

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  case 'MOVE_ITEM':
    let item

    newState = state.map(board => {
      if (action.source.droppableId === board.id + '') {
        item = board.items[action.source.index]
        return {
          ...board,
          items: board.items.filter((_, i) => i !== action.source.index)
        }
      } else {
        return board
      }
    })

    newState = newState.map(board => {
      if (action.destination.droppableId === board.id + ''){
        return {
          ...board,
          items: insertAtIndex(item, action.destination.index, board.items)
        }
      } else {
        return board
      }
    })

    localStorage.setItem('state', JSON.stringify(newState))

    return newState
  case 'MOVE_BOARD':
    console.log('moving board')
    return state
  default:
    return state
  }
}

const insertAtIndex = (x, i, arr) => [].concat(arr.slice(0, i), x, arr.slice(i, arr.length))

export default boards
