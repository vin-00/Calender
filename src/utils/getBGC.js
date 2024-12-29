const getBGC = (month)=>{
        
    switch (month) {
        case 'January':
            return 'jan';  // Blue for work
        case 'February':
            return 'feb';  // Green for personal
        case 'March':
            return 'mar';
        case 'April':
            return 'apr';  // Blue for work
        case 'May':
            return 'may';  // Green for personal
        case 'June':
            return 'jun';
        case 'July':
            return 'jul';  
        case 'August':
            return 'aug';  
        case 'September':
            return 'sep';
        case 'October':
            return 'oct';  
        case 'November':
            return 'nov';  
        case 'December':
            return 'dec';
        default:
            return 'apr';     
    }
}

export default getBGC;