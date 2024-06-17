  import { createSlice } from "@reduxjs/toolkit";

  const todoSlice = createSlice({
    name: 'todos',
    initialState: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : {
        currentIndex: 0,
        todoTitle: [],
        todoLists: [[]]
    },
    reducers: {
        addToDo: (state, action) => {
            state.todoLists[0].push(action.payload)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        handleCheckTodo: (state, action) => {
            state.todoLists[state.currentIndex][action.payload].isCompleted = !state.todoLists[state.currentIndex][action.payload].isCompleted
            localStorage.setItem('todos', JSON.stringify(state))
            return state
        },
        deleteTodo: (state, action) => {
            state.todoLists[state.currentIndex].splice(action.payload, 1)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        // resetTodo: (state) => {
        //     state.length = 0;
        //     localStorage.setItem('todos', JSON.stringify(state))
        //     return state
        // }
        // updateTodo: (state, action) => {

        // }
    }
  })

  export const { addToDo, handleCheckTodo, deleteTodo, resetTodo } = todoSlice.actions 
  export default todoSlice.reducer
