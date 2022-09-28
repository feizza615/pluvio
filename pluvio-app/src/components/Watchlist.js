import React, { Component, useState, useEffect } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "./LoginComponent/ButtonComponent";
import ReviewForm from './ReviewFormComponent/ReviewForm';

const style = {
    fontSize: "15px",
    float: "left",
    marginTop: "10px",
    marginBottom: "20px",
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
            console.log("movie id: " + props.children.props.id)
            console.log("title: " + props.children.key)
            console.log("description: " + props.children.props.description)
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
                {props.children}
                <ButtonComponent style={style} onClick={(e) => handleClick(e)}> {buttonText} </ButtonComponent>
                <ReviewForm id={props.children.props.id} title={props.children.key} image={props.children.props.image}/>
                
            </div>
        </>
    )
}

export default Watchlist