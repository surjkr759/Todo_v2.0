import '../App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdDone, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addTodoTitle, editTodoTitle } from '../store/slice/todoSlice';

const TodoTitle = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)
    const [titleEdit, setTitleEdit] = useState(false);
    const [title, setTitle] = useState('Todo App');
    const editTitleRef = useRef(null)

    useEffect(() => {
        if(titleEdit)
            editTitleRef.current?.focus()
    }, [titleEdit])

    useEffect(() => {
        if(todos.todoTitle.length < todos.currentIndex)
          dispatch(addTodoTitle(title))
        setTitle(todos.todoTitle[todos.currentIndex])
    }, [todos, dispatch])

    const handleDoneTodoTitle = useCallback(() => {
        dispatch(editTodoTitle(title))
        setTitleEdit(false)
    }, [dispatch])

    return (
        <div>
            {titleEdit === true ? 
            <div>
              <input className='title' type='text' value={title} ref={editTitleRef} onChange={e => setTitle(editTitleRef.current.value)} />
              <MdDone style={{width: '25px', height: '25px'}} onClick={handleDoneTodoTitle}/>
            </div> :
            <div>
              <input className='title' type='text' value={title} disabled/> 
              <MdModeEdit style={{width: '25px', height: '25px'}} onClick={e => setTitleEdit(true)}/>
            </div>
        }
        </div>
    );
}

export default TodoTitle;