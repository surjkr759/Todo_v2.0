import TodoComponentTitle from "./TodoTitle"
import TodoInput from "./TodoInput";
import TodoContainer from "./TodoContainer";
import CheckAllTodosCompleted from "./CheckAllTodosCompleted";

const TodoComponent = () => {
    return (
        <div>
            <TodoComponentTitle />
            <br />
            <TodoInput />
            <TodoContainer />
            <CheckAllTodosCompleted />
        </div>
    )
}

export default TodoComponent;