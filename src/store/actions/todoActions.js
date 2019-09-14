export const addTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        firestore.collection('todos').doc(userId).update({
            todos: firestore.FieldValue.arrayUnion(todo)
        }).then(() => {
            dispatch({ type: 'ADD_TODO', todo });
        }).catch((err) => {
            dispatch({ type: 'ADD_TODO_ERROR', err })
        })
    }
};  

export const deleteTodo = (id) => async (
    dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const res = await firestore.collection('todos').doc(userId).get();
        const previousTodos = res.data().todos;
        const newTodos = previousTodos.filter(todo => todo.itemId !== id);
        await firestore.collection('todos').doc(userId).update({
            todos: newTodos
        })
    };  