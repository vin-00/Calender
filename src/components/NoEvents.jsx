import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const NoEvents = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
        borderRadius: 2,
        backgroundColor: "rgba(240, 240, 240, 0.8)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        
      }}
    >
      <EventBusyIcon
        sx={{
          fontSize: 48,
          color: "#b0bec5",
          marginBottom: 2,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#546e7a",
          marginBottom: 1,
        }}
      >
        No Events Found
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#78909c",
        }}
      >
        Looks like you don’t have any events scheduled. Start by adding one now!
      </Typography>
    </Box>
  );
};

export default NoEvents;
