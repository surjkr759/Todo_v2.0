import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { handleCheckTodo, editTodoItems, deleteTodoItem } from '../store/slice/todoSlice';
import { useCallback, useRef, useState } from 'react';
import { MdDelete, MdDone, MdModeEdit } from "react-icons/md";

const TodoContainer = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)
    const editTasksRef = useRef([])

    const [indexVal, setIndexVal] = useState(null);
    const [todoItem, setTodoItem] = useState('');
    const [todoItemEdit, setTodoItemEdit] = useState(false);

    const handleDoneTodo = useCallback((index) => {
        dispatch(editTodoItems({ind: index, val: todoItem}))
        setTodoItemEdit(false)
        setIndexVal(null)
        setTodoItem('')
    }, [dispatch, todoItem])

    const handleEditTodo = useCallback((e, index) => {
        if(!todoItemEdit) {
          setIndexVal(index)
          setTodoItem(todos.todoLists[todos.currentIndex][index].text)
          setTodoItemEdit(true)
          setTimeout(() => {
            editTasksRef.current[index].focus()
          }, 0)
        } else alert('Please save one todo item before editing another')
      }, [todos, todoItemEdit])

    return (
        <div>
            {todos.todoLists.length === todos.currentIndex ? '' : 
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
                                        <input className='todo-item' type='text' value={todoItem} title={todoItem} onChange={e => setTodoItem(editTasksRef.current[index].value)} ref={el => editTasksRef.current[index] = el} style={{ textDecoration: toDo.isCompleted ? 'line-through' : 'none' }} />
                                        <span className='edit'>
                                            <MdDone style={{ width: '20px', height: '20px' }} onClick={e => handleDoneTodo(index)} />
                                        </span>
                                    </div> :
                                    <div style={{ overflow: 'hidden', width: '280px' }}>
                                        <input className='todo-item' type='text' value={todos.todoLists[todos.currentIndex][index].text} title={todos.todoLists[todos.currentIndex][index].text} ref={el => editTasksRef.current[index] = el} disabled style={{ textDecoration: toDo.isCompleted ? 'line-through' : 'none' }} />
                                        {todos.todoLists[todos.currentIndex][index].isCompleted === false ?
                                            <span className='edit'>
                                                <MdModeEdit style={{ width: '20px', height: '20px' }} onClick={e => {
                                                    handleEditTodo(e, index)
                                                }} />
                                            </span> : ''
                                        }
                                    </div>
                                }
                                <span className='delete'>
                                    <MdDelete onClick={e => dispatch(deleteTodoItem(index))} style={{ height: '20px', width: '20px' }} />
                                </span>
                            </li>)
                        }
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default TodoContainer;