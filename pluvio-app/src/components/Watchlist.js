import React, { Component, useState, useEffect } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "./LoginComponent/ButtonComponent";
import ReviewForm from './ReviewFormComponent/ReviewForm';

const style = {
    fontSize: "15px",
    float: "left",
    marginTop: "10px",
    marginLeft: "10px"
}

const Watchlist = (props) => {
    const [buttonText, setButtonText] = useState('Add to watchlist');
    const handleClick = (e) => {
        e.preventDefault();
        

        if (buttonText === "Add to watchlist") {
            setButtonText("Added!");
            setTimeout(() => {
                setButtonText("Remove from watchlist");
            }, 2000)
            console.log("movie id: " + props.id)
            console.log("title: " + props.key)
            console.log("description: " + props.description)
            // alert(props.children.key + " has been added")
        } else {
            // setButtonText("Removed!");
            setTimeout(() => {
                setButtonText("Add to watchlist");
            }, 2000)
            setButtonText("Add to watchlist");

            // alert(props.children.key + " has been removed");
        }
    }

    return (
        <>
            <div >
                <ButtonComponent style={style} onClick={(e) => handleClick(e)}> {buttonText} </ButtonComponent>
                <ReviewForm id={props.id} title={props.title} image={props.image}/>
            </div>
        </>
    )
}

export default Watchlist