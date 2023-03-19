const mongoose = require('mongoose');

mongoose.connect(process.env.REACT_APP_MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log("failed", e);
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const roomSchema = new mongoose.Schema({
    roomId:{
        type:String,
        required:true
    }
    ,
    client:[
        {
            socketId:String,
            username: String,
            status: Boolean
        }
    ]
})
const feedbackSchema = new mongoose.Schema({
    to:{
        type:String,
        required: true
    },
    info:[
        {
            by:String,
            feedback:{
                work:{
                    score:Number,
                    comment:String
                },
                technical:{
                    score:Number,
                    comment:String
                },
                verbal:{
                    score:Number,
                    comment:String
                },
                enth:{
                    score:Number,
                    comment:String
                },
                addComt:{
                    comment:String
                }
            }
        }
    ]
})
const user = mongoose.model("user", newSchema)
const room = mongoose.model("room", roomSchema)
const feedback = mongoose.model("feedback", feedbackSchema)
module.exports= {user, room, feedback}