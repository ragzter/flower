
let nextBoardId = 0

export const addBoard = title => ({
  type: 'ADD_BOARD',
  id: nextBoardId++,
  title
})

export const removeBoard = id => ({
  type: 'REMOVE_BOARD',
  id
})

let nextItemId = 0

export const addItem = (title, id) => ({
  type: 'ADD_ITEM',
  boardId: id,
  id: nextItemId++,
  title
})

export const removeItem = id => ({
  type: 'REMOVE_ITEM',
  id
})

export const moveItemToBoard = (itemId, boardId) => ({
  
})
