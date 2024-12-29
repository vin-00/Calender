import React from 'react';
import Calendar from './components/Calendar';
import "./App.css"

const App = () => {
    return (
        <div className="app">
            <h1>DayWise - Plan your day, the wise way.</h1>
            <Calendar />
        </div>
    );
};

export default App;
