const initState = {
    todos: [
        {id: 1, event: 'Buy bread'},
        {id: 2, event: 'Make pudding'},
        {id: 3, event: 'Watch film'}
    ]
}

const calendarReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_EVENT': 
            return state;
        case 'ADD_EVENT_ERROR':
            console.log('create event error', action.err)  ;
            return state;
        case 'DELETE_EVENT':
            return state;
        case 'DELETE_EVENT_ERROR':
            console.log('delete event error', action.err)  ;
            return state;                
        default:
            return state;      
    }  
}



export default calendarReducer