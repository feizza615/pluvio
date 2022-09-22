import React, { Component, useState } from 'react';
import "./Spoiler.css"


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
                <strong><u>SPOILER ALERT</u></strong>
            </div>
            <div className={style} >
                <div onClick={changeStyle}>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default Spoiler