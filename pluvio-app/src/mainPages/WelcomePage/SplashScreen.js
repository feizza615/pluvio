import React, {useRef, Component, useEffect } from "react";
import splash from "./pluvioLogo.png";
import splash2 from "../../pluvioFullLogo.png";
import { animated, useSpring, useSpringRef, useChain } from 'react-spring';
import { useNavigate, Navigate } from 'react-router-dom'
import {AnimatePresence} from "framer-motion";
import "./Splash.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

 
 
export default function Splash(){
    const navigate = useNavigate()
 
    useEffect(() => {        
      setTimeout(() => {
       <AnimatePresence>{navigate('/welcome') }</AnimatePresence>
      }, 3500)
    }, [])
 
    const logoRef = useSpringRef();
    const spring = useSpring({
    from: {top: "0%" , opacity: "0%"},
    to: { top: "40%", opacity: "100%" },
      ref: logoRef
    });
 
    const pluvioRef = useSpringRef();
  const spring1 = useSpring({
    from: { opacity: "0%", top: "30%" },
    to: { opacity: "100%" },
    ref: pluvioRef
  });
 
//   const subRef = useSpringRef();
//   const spring2 = useSpring({
//     from: { opacity: "0%", left: "-50%", top: "60%" },
//     to: { opacity: "100%", left: "0%"},
//     ref: subRef
//   });


 
    useChain([logoRef, pluvioRef, /*subRef*/], [1, 2]);

    const user = useSelector(selectUser);
    if (user) {
        return <Navigate to="/home" replace />;
    }
 
    return (
    <div className = "App">
     
     
      <animated.div className="splash"  style={spring}> <img src= {splash} alt="" width = "200px"/>  </animated.div>
      <animated.div  className="splash"  style={spring1}> <img src= {splash2} alt="" width = "500px"/> </animated.div>
     
    </div>
    );
}
