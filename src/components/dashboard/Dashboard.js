import React, { Component } from 'react';
import Todos from '../todos/Todos';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { deleteTodo } from '../../store/actions/todoActions';
import CalendarList from '../calendar/CalendarList';

class Dashboard extends Component {
    
    render() {
        const { todos, auth, deleteTodo } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <Todos todos={todos} auth={auth} deleteTodo={deleteTodo} />
                    </div>
                    <div className="col s12 m6">
                        <CalendarList />
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        todos: state.firestore.ordered.todos,
        auth: state.firebase.auth,
        userId: state.firebase.auth.uid
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (id) => dispatch(deleteTodo(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`todos/${props.userId}`])
    // firestoreConnect([
    //     { collection: 'todos' }
    // ])
)(Dashboard)