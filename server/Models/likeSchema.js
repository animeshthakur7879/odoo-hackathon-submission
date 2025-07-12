const {mongoose} = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
         answer : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Answer' ,
          
        } ,
      likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
       
    } , 
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Like' , likeSchema)