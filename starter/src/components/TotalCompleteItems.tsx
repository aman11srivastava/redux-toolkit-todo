import React from 'react';
import {useSelector} from "react-redux";

const TotalCompleteItems = () => {
	const todos = useSelector((state: any): any => state.todos)
	const completedTodos = useSelector((state: any): any => state.todos.filter((todo: any) => todo.completed === true))

	return <h4 className='mt-3'>Total Complete Items: {completedTodos.length}/{todos.length}</h4>;
};

export default TotalCompleteItems;
