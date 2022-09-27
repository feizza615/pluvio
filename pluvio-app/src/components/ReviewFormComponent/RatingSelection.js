import {Box, Rating } from '@mui/material';
import React from 'react';

export default function RatingSelection() {
    const [value, setValue] = React.useState(0);
  
    return (
      <Box
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    );
  }
  