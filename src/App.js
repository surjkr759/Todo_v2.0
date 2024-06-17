import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, handleCheckTodo, deleteTodo, resetTodo } from './store/slice/todoSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { MdDelete, MdDone, MdOutlineCancel, MdModeEdit } from "react-icons/md";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import LinesEllipsis from 'react-lines-ellipsis'

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos)
  const inputRef = useRef(null)
  const editTitleRef = useRef(null)

  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);
  const { width, height } = useWindowSize();
  const [hurrayMessage, setHurrayMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [title, setTitle] = useState('Todo App');
  const [titleEdit, setTitleEdit] = useState('false');
  const [todoItemEdit, setTodoItemEdit] = useState('false');
  
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

  useEffect(() => {
    editTitleRef.current?.focus()
  }, [titleEdit])

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
  }, [todo])

  const handleEditTodo = useCallback((e, index) => {
    // console.log('Event', e)
    // console.log('Index', index)
  })

  const reset = useCallback(() => {
    setHurrayMessage('')
    setShowConfetti(false)
    dispatch(resetTodo())
  }, [todos])


  return (
    <div className="App">
      {titleEdit === true ? 
        <div>
          <input className='title' type='text' value={title} ref={editTitleRef} onChange={e => setTitle(e.target.value)} />
          <MdDone style={{width: '25px', height: '25px'}} onClick={e => setTitleEdit(false)}/>
        </div> :
        <div>
          <input className='title' type='text' value={title} disabled/> 
          <MdModeEdit style={{width: '25px', height: '25px'}} onClick={e => setTitleEdit(true)}/>
        </div>
      }
      
      <br />
      <TextField id="outlined-size-small" label="Enter your todo" size="small" onChange={e => setTodo(e.target.value)} onKeyDown={(e) => {
        if(e.key === 'Enter') handleItemClick()
      }} value={todo} ref={inputRef}/>
      <Button variant="contained" onClick={handleItemClick} style={{margin: '2px 5px 0px 5px'}}>Add</Button>
      <div id='parentTodoContainer'>
        <div id='todoContainer'>
          <ul>
            {todos.todoLists[todos.currentIndex].map((toDo, index) => 
              <li key={toDo.id} style={{textDecoration: toDo.isCompleted ? 'line-through' : 'none'}}>
                <Checkbox
                  checked={toDo.isCompleted}
                  onChange={e => dispatch(handleCheckTodo(index))}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                {titleEdit === true ?
                  '' :
                  <div style={{overflow: 'hidden', width: '280px'}}>
                    {/* <LinesEllipsis
                      text={toDo.text}
                      maxLine='2'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      title={toDo.text}
                    /> */}
                    <input className='todo-item' type='text' value={todos.todoLists[todos.currentIndex][index].text} disabled/>
                    <span className='edit'>
                      <MdModeEdit style={{width: '20px', height: '20px'}} onClick={e => handleEditTodo(e, index)}/>
                    </span>
                  </div>
                }
                
                <span className='edit'>
                  <MdModeEdit onClick={e => handleEditTodo(e, index)} style={{height: '20px', width: '20px'}}/>
                </span>
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
          {showConfetti && <Confetti width={'1200px'} height={height} style={{alignTracks: 'center'}}/>}
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
