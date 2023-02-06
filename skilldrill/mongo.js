const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/skillDrill')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
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
const collection = mongoose.model("collection", newSchema)
const roomCollection = mongoose.model("roomCollection", roomSchema)
const feedbackCollection = mongoose.model("feedbackCollection", feedbackSchema)
module.exports= {collection, roomCollection, feedbackCollection}