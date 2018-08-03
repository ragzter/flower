
let nextBoardId = 0

export const addBoard = name => ({
  type: 'ADD_BOARD',
  id: nextBoardId++,
  name
})

export const removeBoard = id => ({
  type: 'REMOVE_BOARD',
  id
})
