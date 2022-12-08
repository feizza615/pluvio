import React, {useState} from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ButtonComponent from "../LoginComponent/ButtonComponent";
import ReviewForm from '../ReviewFormComponent/ReviewForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from "axios";
 
const style = {
   fontSize: "15px",
   marginTop: "10px",
   marginLeft: "10px"
}
 
const Watchlist = (props) => {
    console.log(props.image)
   const user = useSelector(selectUser);
   const [buttonText, setButtonText] = useState('Add to watchlist');
   const handleClick = (e) => {
       e.preventDefault();
       if (buttonText === "Add to watchlist") {
        const name = user.name;
        const movie = props.id;
        console.log("Adding movie " + movie + " to " + name + "'s movie list...");
           setButtonText("Added");
         
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
 
 
       } else {         
           setButtonText("Add to watchlist"); 
       }
   }
 
   return (
       <>
           <div style={{display:"flex",justifyContent:"space-between"}}>
               <ButtonComponent style={style} onClick={(e) => handleClick(e)}> {buttonText} </ButtonComponent>
               <ReviewForm id={props.id} title={props.title} image={props.image}/>
           </div>
       </>
   )
}
 
export default Watchlist

