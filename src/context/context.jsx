
import React , {useReducer , createContext } from 'react';

import eventReducer from "./eventReducer"

const initialState = JSON.parse(localStorage.getItem("events")) || []; 
export const CalendarContext = createContext(initialState);

export const Provider = ({children}) =>{

    const [events , eventDispatch] = useReducer(eventReducer , initialState);
    
    const deleteEvent =(id)=> eventDispatch({type:'DELETE_EVENT' , payload:id});
    const addEvent =(event) => eventDispatch({type : 'ADD_EVENT' , payload: event});
    const updateEvent = (event)=>eventDispatch({type:'UPDATE_EVENT' , payload:event});
    return (
        <CalendarContext.Provider value={{
            deleteEvent,
            addEvent,
            updateEvent,
            events,
        }}>
            {children}
        </CalendarContext.Provider>
    );
}