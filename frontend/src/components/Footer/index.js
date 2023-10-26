import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Paper
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "10px",
        textAlign: "center",
      }}
      elevation={3}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Challenge | Coodesh
      </Typography>
    </Paper>
  );
}

export default Footer;
