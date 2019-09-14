import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todoActions';
import uuid from 'uuid'


class AddTodo extends Component {
  
    state = {
        itemId: 0,
        content: '',
        author: null
    }  
    
    handleChange = (e) => {
        const auth = this.props.auth;
        this.setState({
            itemId: uuid(),
            content: e.target.value,
            author: auth.uid
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            content: ''
        })
    }

    render() {
        return (
            <div className="row addTodo">
                <form className="col s7 offset-s1" onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.content}/>
                </form>
                <button className="btn btn-small waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>Add New</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => dispatch(addTodo(todo))
    }
}

export default connect(null, mapDispatchToProps)(AddTodo)
