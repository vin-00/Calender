export default function checkOverlap(events, newEvent) {
    
    let check = events.filter((e)=>e.id!=newEvent.id);
    const { startTime: newStart, endTime: newEnd } = newEvent;
  
    check = check.filter((e)=>e.day==newEvent.day);
    for (const event of check) {
      const { startTime, endTime } = event;
  
      if (newStart < endTime && startTime < newEnd) {
        return true; 
      }
    }
  
    return false; 
  }