
const generateId = () => Math.round(Math.random()*Number.MAX_SAFE_INTEGER)

export const addBoard = title => ({
  type: 'ADD_BOARD',
  id: generateId(),
  title
})

export const removeBoard = id => ({
  type: 'REMOVE_BOARD',
  id
})

export const addItem = (title, id) => ({
  type: 'ADD_ITEM',
  boardId: id,
  id: generateId(),
  title
})

export const removeItem = id => ({
  type: 'REMOVE_ITEM',
  id
})

export const moveItemToNextBoard = id => ({
  type: 'MOVE_ITEM_TO_NEXT_BOARD',
  id
})

export const renameBoard = (id, title) => ({
  type: 'RENAME_BOARD',
  id,
  title
})
