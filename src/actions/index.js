
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

export const renameBoard = (id, title) => ({
  type: 'RENAME_BOARD',
  id,
  title
})

export const moveItem = (source, destination) => ({
  type: 'MOVE_ITEM',
  source,
  destination
})

export const moveBoard = (from, to) => ({
  type: 'MOVE_BOARD',
  from,
  to
})
