import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, handleCheckTodo, deleteTodo, resetTodo, addTodoTitle, editTodoTitle, editTodoItems } from './store/slice/todoSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { MdDelete, MdDone, MdModeEdit } from "react-icons/md";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import TodoComponent from './compoenents/TodoComponent';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos)
  const inputRef = useRef(null)
  const editTasksRef = useRef([])

  const [todo, setTodo] = useState('');
  // const [isEditing, setIsEditing] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);
  const { width, height } = useWindowSize();
  const [hurrayMessage, setHurrayMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [todoItemEdit, setTodoItemEdit] = useState(false);
  const [todoItem, setTodoItem] = useState('');
  const [indexVal, setIndexVal] = useState(null);
  
  useEffect(() => {
    inputRef.current?.focus();
    if(checkAllCompleted()) {
      setAllCompleted(true)
      setHurrayMessage('Hurray!! All todos completed')
      setShowConfetti(true)
    }
    else {
      setAllCompleted(false)
      setHurrayMessage('')
      setShowConfetti(false)
    }

  }, [todos])  

  const checkAllCompleted = useCallback(() => {
    const check = todos.todoLists[todos.currentIndex].filter(t => t.isCompleted === true)
    if(todos.todoLists[todos.currentIndex].length > 0 && check.length === todos.todoLists[todos.currentIndex].length) 
      return true
    return false
  }, [todos])

  const handleItemClick = useCallback(() => {
    if(todo.trim() !== '') {
      if(checkDupTodo()) {
        dispatch(addToDo({id: Date.now(), text: todo.replace(/\s+/g,' ').trim(), isCompleted: false}))
        setTodo('')
      } else {
        alert(todo.trim() + ' is already present')
      }
    }
  }, [dispatch, todo])

  const checkDupTodo = useCallback(() => {
    const check = todos.todoLists[todos.currentIndex].filter(t => t.text !== todo)
    if(check.length === todos.todoLists[todos.currentIndex].length)
      return true
    return false
  }, [todos, todo])

  const handleEditTodo = useCallback((e, index) => {
    if(!todoItemEdit) {
      setIndexVal(index)
      setTodoItem(todos.todoLists[todos.currentIndex][index].text)
      setTodoItemEdit(true)
      // console.log('todoItemEdit', todoItemEdit)
      // console.log('Index', editTasksRef.current[index])
      setTimeout(() => {
        editTasksRef.current[index].focus()
      }, 0)
      
    } else alert('Please save one todo item before editing another')
  }, [todos, todoItemEdit])

  const handleDoneTodo = useCallback((index) => {
    dispatch(editTodoItems({ind: index, val: todoItem}))
    setTodoItemEdit(false)
    setIndexVal(null)
    setTodoItem('')
  }, [dispatch, todoItem])


  const reset = useCallback(() => {
    setHurrayMessage('')
    setShowConfetti(false)
    dispatch(resetTodo())
  }, [dispatch])


  return (
    <div className="App">
      
      <TodoComponent />
      
      <br />
      <TextField id="outlined-size-small" label="Enter your todo" size="small" onChange={e => setTodo(e.target.value)} onKeyDown={(e) => {
        if(e.key === 'Enter') handleItemClick()
      }} value={todo} ref={inputRef}/>
      <Button variant="contained" onClick={handleItemClick} style={{margin: '2px 5px 0px 5px'}}>Add</Button>
      <div id='parentTodoContainer'>
        <div id='todoContainer'>
          <ul>
            {todos.todoLists[todos.currentIndex].map((toDo, index) => 
              <li key={toDo.id}>
                <Checkbox
                  checked={toDo.isCompleted}
                  onChange={e => dispatch(handleCheckTodo(index))}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                {indexVal === index && todoItemEdit === true ?
                  <div>
                    <input className='todo-item' type='text' value={todoItem} title={todoItem} onChange={e => setTodoItem(editTasksRef.current[index].value)} ref={el => editTasksRef.current[index] = el} style={{textDecoration: toDo.isCompleted ? 'line-through' : 'none'}}/>
                    <span className='edit'>
                      <MdDone style={{width: '20px', height: '20px'}} onClick={e => handleDoneTodo(index)}/>
                    </span>
                  </div> :
                  <div style={{overflow: 'hidden', width: '280px'}}>
                    <input className='todo-item' type='text' value={todos.todoLists[todos.currentIndex][index].text} title={todos.todoLists[todos.currentIndex][index].text} ref={el => editTasksRef.current[index] = el} disabled style={{textDecoration: toDo.isCompleted ? 'line-through' : 'none'}}/>
                    {todos.todoLists[todos.currentIndex][index].isCompleted === false  ?
                      <span className='edit'>
                        <MdModeEdit style={{width: '20px', height: '20px'}} onClick={e => {
                          handleEditTodo(e, index)
                        }}/>
                      </span> : ''
                    }
                  </div>
                }
                <span className='delete'>
                  <MdDelete onClick={e => dispatch(deleteTodo(index))} style={{height: '20px', width: '20px'}}/>
                </span>
              </li>)}
          </ul>
        </div>
      </div>
      <footer>
        {allCompleted ? 
        <div>
          {showConfetti && <Confetti width={width} height={height}/>}
          {hurrayMessage}
        </div>  : ''}
      </footer>
      <div id='newTodo'>
        <Button variant="outlined" onClick={reset}>Create new Todo List</Button>
      </div>
    </div>
  );
}

export default App;
