import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { addEvent } from "../../store/actions/calendarActions"
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import uuid from 'uuid'
import CalendarItem from './CalendarItem'


const display = {
    display: 'block'
  };
const hide = {
    display: 'none'
  };

class Calendar extends Component {


     state = {
            dateMoment: moment(),
            today: moment(),
            selectedDay: null,
            modalOpen: false,
            event: '',
            eventId: null,
            targetDay:''
        }
  

    

    year = () => {
        return this.state.dateMoment.format("Y");
    }
    month = () => {
        return this.state.dateMoment.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateMoment.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateMoment.get("date");
    }
    currentDay = () => {
        return this.state.dateMoment.format("D");
    }

    firstDayOfMonth = () => {
        let dateMoment = this.state.dateMoment;
        let firstDay = moment(dateMoment).startOf('month').format('d');
        return firstDay;
    }

    nextMonth = () => {
        let dateMoment = Object.assign({}, this.state.dateMoment);
        dateMoment = moment(dateMoment).add(1, "month");
        this.setState({
            dateMoment: dateMoment
        });
        // this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateMoment = Object.assign({}, this.state.dateMoment);
        dateMoment = moment(dateMoment).subtract(1, "month");
        this.setState({
            dateMoment: dateMoment
        });
        // this.props.onPrevMonth && this.props.onPrevMonth();
    }
   
    toggleModal = (e) => {
        const setTargetDay = e.currentTarget.dataset.div_id
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
            targetDay: setTargetDay
        }));
        // console.log(setTargetDay)
    }

    handleChange = (e) => {
        this.setState({
            eventId: uuid(),
            event: e.target.value,
            
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addEvent(this.state);
        // console.log(e.target)
        this.setState({
            event: '',
            modalOpen: false
        })
    }


    render() {
      const { events } = this.props;

      let blanks = [];
      
      for (let i=0; i<this.firstDayOfMonth();i++) {
        blanks.push(
            <div key={Math.random()} className="box">
               
            </div>
        )
        
      }  
      
      let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "current-day": "");
            let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
            let selectedDay = d + this.month() + this.year()
            
            daysInMonth.push(
                <div key={selectedDay} data-div_id={selectedDay} className="boxMain" onClick={this.toggleModal} >
                    <div className="box" >
                        <div className="main-calendar-dateNo">{d}</div> 
                        { events && events.map(event => {
                            return(
                                <CalendarItem event={event} key={event.eventId}  />
                            )
                        })}
                        
                    </div>
                </div>
            );
        }

        var modal = [];
        modal.push(
          <div className="modal" style={this.state.modalOpen ? display : hide}>
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

      return (
          
        <div className="container calendar-container">

            <div>
                {modal}
            </div>
           
            <div className="row">
                <div className="col">
                    <div className="calendar-header">
                        <div className="calendarNav">
                            <div></div>
                            <div className="calendarNav-month">
                                <this.month />{" "}
                                <this.year />  
                            </div>
                            <div className="month-toggler">
                                <button onClick={(e)=>{this.prevMonth()}}>
                                    <i className="material-icons">navigate_before</i>
                                </button>
                                <button onClick={(e)=>{this.nextMonth()}}>
                                    <i className="material-icons">navigate_next</i>
                                </button>
                            </div>
                        </div>
                            <div className="week">
                                <div className="week-item center">Sun</div>
                                <div className="week-item center">Mon</div>
                                <div className="week-item center">Tue</div>
                                <div className="week-item center">Wed</div>
                                <div className="week-item center">Thu</div>
                                <div className="week-item center">Fri</div>
                                <div className="week-item center">Sat</div>
                            </div>
                    </div>
                    <div id="calendar">
                            {blanks} {daysInMonth}
                    </div>
                </div>
            </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
    console.log()
    return {
        events: state.firestore.ordered.events,
        auth: state.firebase.auth,
        userId: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (event) => dispatch(addEvent(event))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`events/${props.userId}`])
)(Calendar)