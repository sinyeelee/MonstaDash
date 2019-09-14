import authReducer from './authReducer'
import todoReducer from './todoReducer'
import calendarReducer from './calendarReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    calendar: calendarReducer
})



export default rootReducer
