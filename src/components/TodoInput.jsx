import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { addToDoItem } from '../store/slice/todoSlice';

const TodoInput = () => {
    const [todo, setTodo] = useState('');
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)

    useEffect(() => {
        inputRef.current?.focus();
    },[])

    const handleItemClick = useCallback(() => {
        if(todo.trim() !== '') {
          if(checkDupTodo()) {
            dispatch(addToDoItem({id: Date.now(), text: todo.replace(/\s+/g,' ').trim(), isCompleted: false}))
            setTodo('')
          } else {
            alert(todo.trim() + ' is already present')
          }
        }
      }, [dispatch, todo])

    const checkDupTodo = useCallback(() => {
        const check = todos?.todoLists[todos?.currentIndex].filter(t => t.text !== todo)
        if(check.length === todos?.todoLists[todos?.currentIndex].length)
            return true
        return false
    }, [todos, todo])

    return (
        <div>
            <TextField id="outlined-size-small" label="Enter your todo" size="small" onChange={e => setTodo(e.target.value)} onKeyDown={(e) => {
                if(e.key === 'Enter') handleItemClick()
            }} value={todo} ref={inputRef}/>
            <Button variant="contained" onClick={handleItemClick} style={{margin: '2px 5px 0px 5px'}}>Add</Button>
        </div>
    )
}

export default TodoInput;