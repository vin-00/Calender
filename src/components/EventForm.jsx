// No Events

import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useContext } from 'react';
import { CalendarContext } from '../context/context';

import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect,useRef } from 'react';
import checkOverlap from '../utils/checkOverlap';

const SimpleDialog=({date, open,onClose , event , setEvent})=> {
  
    const {addEvent , updateEvent , events} = useContext(CalendarContext);
    const [alert , setAlert] = useState("");
    let defEv = {id:uuidv4(),name:"", startTime:"05:00",endTime:"06:00",description:"",category:"personal" ,day:date};
    const text = useRef("Add");

    const [ev,setEv] = useState(defEv);
    
    useEffect(()=>{
      if (Object.keys(event).length === 0) {
        text.current="Add";
        setEv(defEv);
      } else {
        text.current="Update"
        setEv(event);
      }
    }, [event])

    const handleClose = () => {
      onClose(false);
    };
    
    const handleSubmit = ()=>{
      if(ev.name=="" || ev.startTime=="" || ev.endTime=="" || ev.category==""){
        setAlert("Please fill the required fields");
        setTimeout(()=>{
          setAlert("");
        },2000)
        return;
      }

      if(ev.startTime>ev.endTime){
        setAlert("Please provide valid time interval");
        setTimeout(()=>{
          setAlert("");
        },2000)
        return;
      }

      if(checkOverlap(events , ev)){
        setAlert("The event is overlapping with other events");
        setTimeout(()=>{
          setAlert("");
        },2000)
        return ;
      }

      if(text.current==="Add"){
        addEvent(ev);
        handleClose();
        return;
      }

      updateEvent(ev);
      handleClose();
    }
    
  
    return (
      <Dialog  onClose={handleClose} open={open}>
        {alert.length>0 && <Alert variant="filled" severity="error">
        {alert}
      </Alert>}
        <DialogTitle>Event Details</DialogTitle>
        <Divider variant='middle' />
        <Box sx={{p:4 , display:"flex",flexDirection:"column"}}>
          
          <TextField
            label="Event Name"
            fullWidth
            value={ev.name}
            onChange={(e)=>setEv({...ev , name:e.target.value})}
          />
          <br />

          <Box>
          <TextField
          sx={{marginRight:2,}}
            label="Start Time"
            type='time'
            value={ev.startTime}
            onChange={(e)=>setEv({...ev , startTime:e.target.value})}
          />
          
          <TextField
            label="End Time"
            type='time'
            value={ev.endTime}
            onChange={(e)=>setEv({...ev , endTime:e.target.value})}
          />
          </Box>
          

          <br />
          <br />

          <TextField
            label="Description (Optional)"
            multiline
            rows={4}
            fullWidth
            value={ev.description}
            onChange={(e)=>setEv({...ev , description:e.target.value})}
          />
          <br />
          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id=""
              value={ev.category}
              label="category"
              onChange={(e)=>setEv({...ev , category:e.target.value})} 
            >
              <MenuItem value={"work"}>Work</MenuItem>
              <MenuItem value={"personal"}>Personal</MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
          </FormControl>

            
          <br />
          <Button variant="contained" color="success" onClick={()=>handleSubmit()}>
            {text.current}
          </Button>

        </Box>
        
      </Dialog>
    );
  }

  export default SimpleDialog;
