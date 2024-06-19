import TodoTitle from "./TodoTitle"
import TodoInput from "./TodoInput";
import TodoContainer from "./TodoContainer";
import CheckAllTodosCompleted from "./CheckAllTodosCompleted";

const TodoComponent = () => {
    return (
        <div>
            <TodoTitle />
            <br />
            <TodoInput />
            <TodoContainer />
            <CheckAllTodosCompleted />
        </div>
    )
}

export default TodoComponent;