import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import questionService from "./questionService";

const questionSlice = createSlice({
    name : 'question' , 
    initialState : {
        allQuestions : []  ,
        question : {} ,
        isLoading : false , 
        isSuccess : false ,
        isError : false ,
        message : ""
    } , 
    reducers : {} , 
    extraReducers : (builder) => {
        
        builder
            .addCase(getQuestions.pending , (state , action)    => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(getQuestions.fulfilled , (state , action)    => {
                state.isLoading = false
                state.isSuccess = true
                state.allQuestions = action.payload 
                state.isError = false
            })
            .addCase(getQuestions.rejected , (state , action)    => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
            //ADD QUESTION LICE
            .addCase(addQuestion.pending , (state , action)    => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(addQuestion.fulfilled , (state , action)    => {
                state.isLoading = false
                state.isSuccess = true
                state.allQuestions = [action.payload , ...state.allQuestions]
                state.isError = false
            })
            .addCase(addQuestion.rejected , (state , action)    => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
        
    }
})

export default questionSlice.reducer


//ADD QUESTUION

export const addQuestion = createAsyncThunk(
    "ADD/QUESTION" , 
    async (formData , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        try {
            return await questionService.addQuestion(formData , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//GET QUESTION 

export const getQuestions = createAsyncThunk(
    "GET/QUESTIONS" , 
    async ( _ , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        try {
            return await questionService.getAllQuestions( token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)