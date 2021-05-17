import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const todosAdapter = createEntityAdapter();

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoUpdated: todosAdapter.updateOne
  },
})

export const { todoAdded, todoUpdated } = todosSlice.actions

export const {
  selectAll: selectAllTodos,
} = todosAdapter.getSelectors((state) => state.todos)

export default todosSlice.reducer
