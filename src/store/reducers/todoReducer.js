const initState = {
    todos: [
        {id: 1, content: 'Buy bread'},
        {id: 2, content: 'Make pudding'},
        {id: 3, content: 'Watch film'}
    ]
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TODO': 
            return state;
        case 'ADD_TODO_ERROR':
            console.log('create project error', action.err)  ;
            return state;
        case 'DELETE_TODO':
            return state;
        case 'DELETE_ERROR':
            console.log('delete todo error', action.err)  ;
            return state;                
        default:
            return state;      
    }  
}



export default todoReducer