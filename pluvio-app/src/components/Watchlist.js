import React, {useState} from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "./LoginComponent/ButtonComponent";
import ReviewForm from './ReviewFormComponent/ReviewForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import axios from "axios";
 
const style = {
   fontSize: "15px",
   float: "left",
   marginTop: "10px",
   marginLeft: "10px"
}
 
const Watchlist = (props) => {
   const user = useSelector(selectUser);
   const [buttonText, setButtonText] = useState('Add to watchlist');
   const handleClick = (e) => {
       e.preventDefault();
        
       if (buttonText === "Add to watchlist") {
        const name = user.name;
        const movie = props.id;
        console.log("Adding movie " + movie + " to " + name + "'s movie list...");
           setButtonText("Added!");
           setTimeout(() => {
               setButtonText("Remove from watchlist");
           }, 2000)     
         
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

