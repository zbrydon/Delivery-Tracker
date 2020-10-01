import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// date picker function used when selecting a date for an order
// this uses a fairly out-dated library
function DatePickers() {
    const [selectedDate, setSelectedDate] = useState(null)
    return (
        <div style={{ justifyContent: "center", margin: "auto", display: "flex", padding: "0px" }}> 
        {/* styling of the datepicker */}
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                
            />
        </div>
    )
}
export default DatePickers