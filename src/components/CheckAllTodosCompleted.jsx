import { useCallback, useEffect, useRef, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { createNewTodoList, addTodoTitle } from '../store/slice/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const CheckAllTodosCompleted = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)
    const { width, height } = useWindowSize();

    const [allCompleted, setAllCompleted] = useState(false);
    const [hurrayMessage, setHurrayMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if(todos.todoLists.length !== todos.currentIndex) {
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
        }
    }, [todos])

    const checkAllCompleted = useCallback(() => {
        const check = todos?.todoLists[todos?.currentIndex]?.filter(t => t.isCompleted === true)
        if(todos?.todoLists[todos?.currentIndex]?.length > 0 && check.length === todos?.todoLists[todos?.currentIndex]?.length) 
          return true
        return false
    }, [todos])

    const reset = useCallback(() => {
        setHurrayMessage('')
        setShowConfetti(false)
        dispatch(addTodoTitle({t: 'Todo App', arr: []}))
        dispatch(createNewTodoList())
    }, [dispatch])

    return (
        <div>
            <footer>
                {allCompleted ? 
                <div>
                    {showConfetti && <Confetti confettiSource = {{w: 900, x: 500}} height={height}/>}
                    {hurrayMessage}
                </div>  : ''}
            </footer>
            <div id='newTodo'>
                <Button variant="contained" onClick={reset}>Create new Todo List</Button>
            </div>
        </div>
    )
}

export default CheckAllTodosCompleted;