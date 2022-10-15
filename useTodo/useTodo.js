import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => JSON.parse(localStorage.getItem('todos') || []);

export const useTodo = () => {
    
    const [todos, dispatchTodos] = useReducer( todoReducer, [], init);
    
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    const todosCount = todos.length;

    const pendingTodosCounting = todos.filter( todo => !todo.done).length;

    const onAddToDo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatchTodos(action);
    }

    const onDeleteTodo = (id) => {
        dispatchTodos({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo = (id) => {
        dispatchTodos({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }

    return {
        todos,
        onAddToDo,
        onDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCounting,
    };
}

