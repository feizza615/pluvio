import {Box, Rating } from '@mui/material';
import React from 'react';
import "./ReviewBox.css"

export default function RatingArea({ratingdata}) {
    const [value] = React.useState(ratingdata ? ratingdata : 5);
 
    return (
            <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating style={{ fontSize: "20px", }} name="read-only" value={value} readOnly />
    </Box>
    );
  }


