import '../App.css';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { deleteTodo, todoCurrentSelection } from '../store/slice/todoSlice';
import TodoComponent from './TodoComponent';

const AllTodosList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    useEffect(() => {
        setSelectedIndex(todos?.currentIndex);
    }, [todos])

    const renderRow = (props) => {
        const { index, style } = props;
    
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton selected={selectedIndex === index} >
                    <ListItemText primary={todos?.todoTitle[`${index}`]} onClick={e => dispatch(todoCurrentSelection(index))} />
                    <MdDelete onClick={e => {
                        dispatch(deleteTodo(index))
                        console.log('Selected index after delete', todos?.currentIndex)
                        // setSelectedIndex(todos?.currentIndex);
                    }} style={{ height: '20px', width: '20px' }} />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <div className='App'>
            <div id='todoLists'>
                <h1 style={{padding: '0px 10px'}}>Your Todos</h1>
                <hr />
                <Box sx={{ bgcolor: '#eee' }} >
                    <FixedSizeList
                        height={600}
                        width={230}
                        itemSize={46}
                        itemCount={todos?.todoTitle.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
            </Box>
            </div>
            <div className='todo-frame'>
                <TodoComponent />
            </div>
        </div>
    )
}

export default AllTodosList;