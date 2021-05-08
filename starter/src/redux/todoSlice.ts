import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const URL = "http://localhost:7000/todos"

export const getTodoAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const response = await fetch(URL)
    if (response.ok) {
        const todos = await response.json();
        return {todos}
    }
});

export const addTodoAsync = createAsyncThunk(
    'todos/addTodosAsync',
    async (payload: any) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: payload.title}),
        })
        if (response.ok) {
            const todo = await response.json();
            return {todo}
        }
    })

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleCompleteAsync',
    async (payload: any) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({completed: payload.completed})
        })
        if (response.ok) {
            const todo = await response.json()
            return {id: todo.id, completed: todo.completed}
        }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload: any) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: payload.id})
        })
        if (response.ok) {
            const todos = await response.json();
            return {todos}
        }
    }
)

export type todoType = {
    title: string
    id: number
    completed: boolean
}

const initialState: Array<todoType> = [
    {
        id: 1,
        title: 'todo 1',
        completed: true
    },
    {
        id: 2,
        title: 'todo 2',
        completed: false
    },
    {
        id: 3,
        title: 'todo 3',
        completed: false
    },
]

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo)
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        },
    },
    extraReducers: {
        [getTodoAsync.pending.toString()]: (state, action) => {
            console.log('Fetching data...')
        },
        [getTodoAsync.fulfilled.toString()]: (state, action): any => {
            console.log('Fetch successful !')
            return action.payload.todos
        },
        [addTodoAsync.fulfilled.toString()]: (state, action) => {
            state.push(action.payload.todo)
        },
        [toggleCompleteAsync.fulfilled.toString()]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled.toString()]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        }
    }
})

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions
export default todoSlice.reducer
