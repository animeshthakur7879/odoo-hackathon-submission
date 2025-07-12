import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import question from "./questions/questionSlice"

const store = configureStore( {
     
        reducer : {auth , question}
    
})

export default store