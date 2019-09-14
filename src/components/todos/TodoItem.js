import React from 'react';


const TodoItem = ({todo, deleteTodo}) => {
    // console.log(todo)
    return (
        <div className="todo-items">

         { !todo.todos ? (
             <p className="center" style={{marginLeft:"-2rem"}}>You have no todos</p>
         ) : todo.todos.length === 0 ? 
            (
            <p className="center" style={{marginLeft:"-2rem"}}>Emptied!</p>
            ) : (
                todo.todos.slice(0).reverse().map(todo => {
                    return (
                        <li key={todo.itemId} onClick={() => {deleteTodo(todo.itemId)}} >
                        {todo.content}
                        <i className="material-icons right">delete</i>
                        </li>
                        
                    )
                })                  
            ) 
         }
        </div>
    )
    
}


export default TodoItem
