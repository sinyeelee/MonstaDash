import React from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const Todos = ({todos, auth, deleteTodo}) => {

        return (
            <div className="todo-list section">
                <div className="card z-depth-0 todo-list">
                    <div className="card-content grey-text text-darken-3">
                        <h3 className="list-title center">Todos</h3>
                        <ul>
                            
                            { todos && todos.map(todo => {
                                return(
                                    <TodoItem todo={todo} deleteTodo={deleteTodo} key={todo.id}/>
                                )
                            })
                        }
                        </ul>
                    </div>
                    <AddTodo auth={auth} />
                </div>
            </div>
        )

}

export default Todos
