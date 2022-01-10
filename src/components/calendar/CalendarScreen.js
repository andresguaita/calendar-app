import React, {useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import { NavBar } from '../ui/NavBar'
import { CalendarEvent } from './CalendarEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarModal } from './CalendarModal'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'


const localizer = momentLocalizer(moment)

const events = [

    {
        title: 'Cumpleaños de yolis',
        start: moment().toDate(),
        end: moment().add(2,'hours').toDate(),
        notes: 'Comprar Pastel',
        user: {
            _id:123,
            name: 'Andres'
        }
    }

]

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        console.log(e);
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView',e)
    }

    const eventStyleGetter= (event,start,end, isSelected) =>{

        const style = {
            backgroundColor : '#209700',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'

        }

        return {
            style
        }

    }

    return (
        <div className='calendar-screen'>
            <NavBar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                view={lastView}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                components={{
                    event: CalendarEvent
                }}
    /> 
        <CalendarModal/>
        </div>
    )
}
