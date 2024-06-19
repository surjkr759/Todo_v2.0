import '../App.css';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { deleteTodo, todoCurrentSelection } from '../store/slice/todoSlice';
import TodoComponent from './TodoComponent';

const AllTodosList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const renderRow = (props) => {
        const { index, style } = props;
    
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton selected={selectedIndex === index} onClick={e => {
                    handleListItemClick(e, index)
                    dispatch(todoCurrentSelection(index))
                }}>
                    <ListItemText primary={todos.todoTitle[`${index}`]} />
                    <MdDelete onClick={e => dispatch(deleteTodo(index))} style={{ height: '20px', width: '20px' }} />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <div className='App'>
            <div className='todo-frame'>
                <TodoComponent />
            </div>
            <div id='todoLists'>
                <h1 style={{padding: '0px 10px'}}>Your Todos</h1>
                <hr />
                <Box sx={{ bgcolor: '#eee' }} >
                    <FixedSizeList
                        height={600}
                        width={230}
                        itemSize={46}
                        itemCount={todos.todoTitle.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
            </Box>
            </div>
        </div>
    )
}

export default AllTodosList;