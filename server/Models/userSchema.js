const {mongoose} = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String ,
            required :true
        } ,
        email : {
            type : String ,
            required : true ,
            unique : true 
        } ,
        phoneNumber : {
            type : String ,
        } ,
        avatar : {
            type : String ,
        } ,
    } , 
    {
        timestamps : true
    }
)

module.exports = mongoose.model('User' , userSchema)