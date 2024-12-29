import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Calendar.css'; 

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid2';

import EventDrawer from './EventDrawer';

import getBGC from "../utils/getBGC"

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
  }));


const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(moment());
    
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');

    const handleKeyDown = (e) => {
        const isInputFocused = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable;
        if (isInputFocused) {
            return;
        }
        if (e.key === 'ArrowLeft') {
            setCurrentDate(currentDate.clone().subtract(1, 'month'))
        } else if (e.key === 'ArrowRight') {
            setCurrentDate(currentDate.clone().add(1, 'month'))
        }
    };
    
    useEffect(() => {
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [currentDate, setCurrentDate]);

    const generateCalendarGrid = () => {
        const days = [];
        let day = startOfWeek.clone();
        while (day.isBefore(endOfWeek, 'day')) {
            days.push(day.clone());
            day.add(1, 'day');
        }

        days.push(day);
        return days;
    };

    const month = currentDate.format('MMMM');

    const isToday = (day) => {
        return day.isSame(moment(), 'day');
    };

    return (
        <div className="calendar-container">
            <header className={`calendar-header ${getBGC(month)}`}>
                <h2>{currentDate.format('MMMM YYYY')}</h2>
                <div className="calendar-navigation">
                    <button onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}>
                        <ArrowBackIosIcon />
                    </button>
                    <button onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
            </header>

            {/* Weekday Labels */}
            <div className='border'>
            <Grid container spacing={{xs:1,md:2}} marginBottom={2}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
                    
                    <Grid size={1.68}
                    key={weekday}
                    >
                            <Item className="weekday">{weekday}</Item>
                            
                    </Grid>
                    
                ))}
            </Grid>

            {/* Calendar Grid */}
            <Grid container spacing={{xs:1,md:2}} >
                {generateCalendarGrid().map((day, index) => {
                    const isCurrentMonth = day.month() === currentDate.month();
                    
                    return (
                        <Grid size={1.68}
                        key={index}
                        >
                                <EventDrawer day={day} today={isToday(day)} currentMonth={isCurrentMonth}></EventDrawer>
                                
                        </Grid>
                        
                        
                    );
                })}
            </Grid>
            </div>
            
        </div>
    );
};

export default Calendar;
