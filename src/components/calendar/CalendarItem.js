import React from 'react';


const CalendarItem = ({event}) => {
   


    return (
        
        <div className="event-items">
         { event.events  ? (
             event.events.slice(0).reverse().map(event => {
                 let getDate = document.getElementsByClassName("box").parentNode

                 console.log(getDate)
                return (
                    <li key={event.eventId} onClick={() => {}} >
                    {event.event}
                    </li>
                    
                )
            })                 
         )  : (
               <div></div>  
            ) 
         }
        </div>
        
    )
    
}


export default CalendarItem
