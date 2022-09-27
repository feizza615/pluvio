import React, { Component, useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "./LoginComponent/ButtonComponent";

const style ={
    fontSize: "15px",
    float: "right",
    marginTop: "10px"
}
const test ={
    display: "flex",
}

const Watchlist = (props) => {
    const [buttonText, setButtonText] = useState('Add to watchlist');
    const handleClick = (e, prop) => {
        e.preventDefault();
        console.log(props.children.key)
        if(buttonText === "Add to watchlist"){
            setButtonText("Remove from watchlist");
            alert(props.children.key + " has been added")
        } else {
            alert(props.children.key + " has been removed");
            setButtonText("Add to watchlist");
        }
        
    }

    return (
        <>
            <div >
                <ButtonComponent style = {style} onClick={(e) => handleClick(e)}> {buttonText} </ButtonComponent>
                {props.children}
            </div>
        </>
    )
}

export default Watchlist