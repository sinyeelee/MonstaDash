import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { addEvent } from "../../store/actions/calendarActions"
import { compose } from 'redux'
import moment from 'moment'
import uuid from 'uuid'
import { isTemplateElement } from '@babel/types';
import { ENETUNREACH } from 'constants';


const display = {
    display: 'block'
  };
const hide = {
    display: 'none'
  };

class CalendarList extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            dateMoment: moment(),
            today: moment(),
            selectedDay: null,
            modalOpen: false,
            event: '',
            eventId: null,
            author: null
        }
    }

    startOfWeek = () => {
        return this.state.dateMoment.startOf('isoWeek')
    }

    endOfWeek = () => {
        return this.state.dateMoment.endOf('isoweek')
    }

    toggleModal(e) {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
            event: ''
        }));
    }

    handleChange = (e) => {
        const auth = this.props.auth;
        this.setState({
            eventId: uuid(),
            event: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.addEvent(this.state);
        this.setState({
            event: ''
        })
    }
    
    render() {

        var cmodal = [];
        cmodal.push(
          <div id= "cmodel" className="modal" style={this.state.modalOpen ? display : hide}>
          <div className="modal-content">
            <h5>Add an event</h5>
            <div className="row">
                <br />
                <div className="input-field" onSubmit={this.handleSubmit}>
                    <input id="addEvent" type="text" onChange={this.handleChange} value={this.state.event}/>
                    <label htmlFor="addEvent">Event</label>
                </div>
            </div>
          </div>
          <div className="modal-footer">
            <a className="btn-small red darken-2" onClick={this.toggleModal}>Cancel</a>{" "}
            <a className="btn-small" onClick={this.handleSubmit}>Submit</a>
          </div>
        </div>
        );
        
        var days = [];
        let day = this.startOfWeek();
        
        for ( var i =1; i <= 7; i++) {
            days.push(day.format("MMMM DD YYYY"));
            day = day.clone().add(1, 'days');
        }

        console.log();

        const daysOfWeek = days.map(day => {
            return (
                <div className="collection-box">
                    <ul className="collection" onClick={this.toggleModal}>
                        <li className="collection-header">
                            {day}
                        <div className="addbtn">+</div>    
                        </li>  
                    </ul>
                </div>
                
                 
            )
        })
    
      return (
          
        <div className="calendarList-container">

            <div>
                {cmodal}
            </div>
          
            <div>
                {daysOfWeek}  
            </div>
                
           
         
        </div>
      )
    }
}






export default CalendarList
