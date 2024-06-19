import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { deleteTodo } from '../store/slice/todoSlice';

const AllTodosList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todos)

    const renderRow = (props) => {
        const { index, style } = props;
    
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={todos.todoTitle[`${index}`]} />
                    {/* <span className='delete'> */}
                    <MdDelete onClick={e => dispatch(deleteTodo(index))} style={{ height: '20px', width: '20px' }} />
                    {/* </span> */}
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <div>
            <h1 style={{padding: '0px 10px'}}>Your Todos</h1>
            <Box sx={{ bgcolor: 'background.paper' }} >
                <FixedSizeList
                    height={400}
                    width={220}
                    itemSize={46}
                    itemCount={todos.todoTitle.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>
        </div>
    )
}

export default AllTodosList;