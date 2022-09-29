import {Box, Rating } from '@mui/material';
import React from 'react';

export default function RatingSelection(props) {
    const [value, setValue] = React.useState(0);
    return (
      <Box
      >
        <Rating
          sx={{
            "label .MuiRating-icon": {
              color: "#faaf00"
            }
          }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
            props.onratingchange(newValue);
          }}
        />
      </Box>
    );
  }
  