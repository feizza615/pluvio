import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user", //name of slice is user
    initialState:{
        user:null // user has not logged in
    },
    reducers:{
        //update state and action is data being passed
        loginFunc: (state, action) =>{
            state.user = action.payload;
        },
        changeColor: (state, color) => {
            state.user = color;
        },
        logout: (state)=>{
            state.user = null;
        }
    }

})

export const {loginFunc,logout,changeColor} = userSlice.actions;

export const selectUser = (state)=> state.user;

export default userSlice.reducer; 
