import React, { Component, useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "./LoginComponent/ButtonComponent";

const style ={
    fontSize: "15px",
}

const Watchlist = (props) => {
    const [buttonText, setButtonText] = useState('Add to watch list');
    const handleClick = (e) => {
        e.preventDefault();
        setButtonText("Added!");
    }

    return (
        <>
            <div>
                <ButtonComponent style = {style} onClick={(e) => handleClick(e)}> {buttonText} </ButtonComponent>
            </div>
        </>
    )
}

export default Watchlist