

const eventReducer = (state ,action)=>{
    let events;

    switch (action.type){

        case 'DELETE_EVENT':
            events = state.filter((e)=>e.id!=action.payload);

            localStorage.setItem("events" , JSON.stringify(events));
            return events;

        case 'ADD_EVENT':
            events = [action.payload , ...state];

            localStorage.setItem("events" , JSON.stringify(events));
            return events;
        case 'UPDATE_EVENT':
            let id = action.payload.id;
            events = state.filter((e)=>e.id!=id);

            events = [action.payload , ...events];
            localStorage.setItem("events" , JSON.stringify(events));
            return events;
    
        default:
            return state;
    }
}



export default eventReducer; 