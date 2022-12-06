import React, {useState} from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "../LoginComponent/ButtonComponent";
import ReviewForm from '../ReviewFormComponent/ReviewForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import {Box, Modal, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material';

 
const style = {
   fontSize: "15px",
   marginTop: "10px",
   marginLeft: "10px"
}
 
const Watchlist = (props) => {
   const user = useSelector(selectUser);
   const [added, setAdd] = useState(false);
   const handleClick = (e) => {
       e.preventDefault();
    
       if (added==false) {
        const name = user.name;
        const movie = props.id;
        console.log("Adding movie " + movie + " to " + name + "'s movie list...");
        
           const configuration = {
            method: "post",
            url:  "http://localhost:5001/users/watchlist",
            data: {
                name,
                movie,
              },             
             };

             axios(configuration)
              .then((result) =>
             {
               console.log(result);
               console.log(user)
             })
             .catch((error) => {
               error = new Error();
             });
        setAdd(true);
       } 
       
   }
 
   return (
       <>
           <div style={{display:"flex",justifyContent:"space-around"}}>
               <Button onClick={handleClick}>
                <div className="circle">
                {added==false?<AddIcon sx={{ fontSize: 55 ,paddingTop:1}}/> : <CheckIcon sx={{ fontSize: 55 ,paddingTop:1}}/>}
                </div>
                </Button>
               <ReviewForm id={props.id} title={props.title} image={props.image}/>
           </div>
       </>
   )
}
 
export default Watchlist

