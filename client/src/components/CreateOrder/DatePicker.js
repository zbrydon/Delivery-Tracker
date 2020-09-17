import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DatePickers() {
    const [selectedDate, setSelectedDate] = useState(null)
    return (
        <div style={{ justifyContent: "center", margin: "auto", display: "flex", padding: "0px" }}>
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