  import { createSlice } from "@reduxjs/toolkit";

  const todoSlice = createSlice({
    name: 'todos',
    initialState: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : {
        currentIndex: 0,
        todoTitle: ['Todo App'],
        todoLists: [[]],
    },
    reducers: {
        addToDoItem: (state, action) => {
            state.todoLists[state.currentIndex].push(action.payload)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        handleCheckTodo: (state, action) => {
            state.todoLists[state.currentIndex][action.payload].isCompleted = !state.todoLists[state.currentIndex][action.payload].isCompleted
            localStorage.setItem('todos', JSON.stringify(state))
            return state
        },
        deleteTodoItem: (state, action) => {
            state.todoLists[state.currentIndex].splice(action.payload, 1)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        addTodoTitle: (state, action) => {
            const payload = {t: 'Todo App', arr: []}
            state.todoTitle.push(payload. t)
            state.todoLists.push(payload.arr)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        editTodoTitle: (state, action) => {
            state.todoTitle.splice(state.currentIndex, 1, action.payload)
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        editTodoItems: (state, action) => {
            state.todoLists[state.currentIndex][action.payload.ind].text = action.payload.val
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        deleteTodo: (state, action) => {
            state.todoTitle.splice(action.payload, 1)
            state.todoLists.splice(action.payload, 1)
            if(state.todoTitle.length > 0)
                state.currentIndex = state.todoTitle.length - 1
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        createNewTodoList: (state, action) => {
            state.currentIndex = state.todoTitle.length - 1
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        },
        todoCurrentSelection: (state, action) => {
            state.currentIndex = action.payload
            localStorage.setItem('todos', JSON.stringify(state))
            return state;
        }
    }
  })

  export const { addToDoItem, handleCheckTodo, deleteTodoItem, createNewTodoList, addTodoTitle, editTodoTitle, editTodoItems, deleteTodo, todoCurrentSelection } = todoSlice.actions 
  export default todoSlice.reducer
