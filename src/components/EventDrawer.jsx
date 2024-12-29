import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";

import {IconButton , Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import SimpleDialog from "./EventForm"

import NoEvents from './NoEvents';

import {useContext} from 'react';
import { CalendarContext } from "../context/context";

import getColor from "../utils/getColor"

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    // textAlign: 'center',
  }));

const EventDrawer= ({day ,today, currentMonth})=> {

  const dayDate = day.format("DD MM YYYY");
  const {events , deleteEvent} = useContext(CalendarContext);

  const dayEvents = events.filter((event)=>event.day==dayDate);

  const [open, setOpen] = React.useState(false);

  const [event,setEvent ] = useState({});
  const [formOpen , setFormOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: { sm: 400 }, margin:3}} role="presentation" >
      <SimpleDialog date={dayDate} open={formOpen} onClose={setFormOpen} event={event} setEvent={setEvent}></SimpleDialog>
      <Typography
      variant="h5" 
      component="h1" 
      align="center"
      sx={{
        fontWeight: "bold", 
        marginY: 2, 
        color: "black", 
      }}
    >
      Events for {day.format("D MMMM")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:3
        }}
      >
        <Button variant="contained" color="success" onClick={()=>{setEvent({});setFormOpen(true)}}>
          Add an event
        </Button>
        
      </Box>
      
      <Divider  variant="middle" />
      <Grid container spacing={2} marginTop={3}>
          
      {dayEvents.map((event)=>(
        <Grid size={12} key={event.id}>
        <Accordion sx={{borderLeft:`5px solid ${getColor(event.category)}`}} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width:"100%"
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="p" color="grey">{event.startTime} - {event.endTime}</Typography>
              </Box>

              <Box sx={{
                display: "flex",
                justifyContent:"center",
                alignItems: "center"
              }}
              >
                <IconButton aria-label="edit" color="grey" onClick={()=>{setEvent({...event});setFormOpen(true)}}>
                  <EditIcon/>
                </IconButton>
                
                <IconButton aria-label="delete" color="error" onClick={()=>{deleteEvent(event.id)}}>
                  <DeleteIcon />
                </IconButton>
                
              </Box>

              
            </Box>
            
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">
            {event.description.length==0 ? "No Description" : event.description}
            </Typography>
            
          </AccordionDetails>
        </Accordion>
      </Grid>
      ))}

      {dayEvents.length==0 && <NoEvents />}
      
      </Grid>
      
    </Box>
  );

  return (
    <Box sx={{display:"flex" , flexDirection:"column"}}>
      
        <Item  className={`calendar-cell ${
              currentMonth ? 'current-month' : 'other-month'
          } ${today ? 'today' : ''}`} onClick={toggleDrawer(true)}>
            <div>
            {day.date()}
            </div>

            <Box sx={{display : "flex", justifyContent:"flexStart"}}>
              {dayEvents.slice(0,3).map((dayE)=><Box
                key={dayE.id}
                sx={{
                  margin:'0px 2px',
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: `${getColor(dayE.category)}`,
                }}
              />)}
            </Box>
        </Item>

        
        
        <Drawer anchor={isMobile ? "bottom" : "right"} open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
    </Box>
  );
}

export default EventDrawer;
