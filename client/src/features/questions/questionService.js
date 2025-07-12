import axios from "axios"

const getAllQuestions = async(token) => {

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.get(`/api/question` , options)

    return response.data

}

//Get single question

const getQuestion = async(qid , token) => {

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.get(`/api/question/${qid}` , options)

    return response.data

}

//Add question
const addQuestion = async(formData , token) => {

    console.log(formData)

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.post(`/api/question` , formData ,options)

    return response.data
    // console.log(response.data)

}


const questionService = {getAllQuestions , addQuestion , getQuestion}

export default questionService