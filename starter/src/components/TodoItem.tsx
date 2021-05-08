import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodo, deleteTodoAsync, toggleComplete, toggleCompleteAsync} from "../redux/todoSlice";

interface TodoItemProps {
    id: number
    title: string
    completed: boolean
}

const TodoItem = ({id, title, completed}: TodoItemProps) => {
    const dispatch = useDispatch();

    const handleCompletedCheck = () => {
        dispatch(toggleCompleteAsync({
            id,
            completed: !completed
        }))
    };

    const handleDelete = () => {
        dispatch(deleteTodoAsync({
            id
        }))
    };

    return (
        <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
            <div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input onChange={handleCompletedCheck} type='checkbox' className='mr-3' checked={completed}/>
                    {title}
				</span>
                <button onClick = {handleDelete} className='btn btn-danger'>Delete</button>
            </div>
        </li>
    );
};

export default TodoItem;
