// Footer.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function Footer(){
  const footer = {
    backgroundColor: 'rgb(66,66,66,0.88)',
    color: 'white',
    textAlign: 'center',
    padding: '16px',
  }
  return (
    <Paper style={footer} elevation={3}>
      <Typography variant="body1" style={{ fontFamily: 'cursive', }}>
        &copy;  MC אקורד מסטאר {new Date().getFullYear()}
      </Typography>
    </Paper>
  );
};

