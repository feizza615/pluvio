import React, { Component, useState } from 'react';
import "./Spoiler.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';


const Spoiler = (props) => {
    const [style, setStyle] = useState("spoilerStyle");
    const [text, text2] = useState("spoilerWarning");
    const changeStyle = () => {
        setStyle("unBlurSpoilerStyle")
        text2("spoilerGone")
    }
    return (
        <>
            <div className={text}>
                <div className="hide">
                    <ErrorOutlineOutlinedIcon />
                    <p style={{margin: 0, fontSize: "20px",transition: "visibility 500ms ease"}}>SPOILER ALERT</p>
                </div>
                <div className={style} style={{transition: "filter 500ms ease"}}>
                    <div onClick={changeStyle}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Spoiler