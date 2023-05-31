import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    title:{
        type: String,
        default:''
    },
    content:{
        type: String,
        default:''
    },
    position:{
        type:Number
    }
    
},{
    timestamps: true
}
)

const Task = mongoose.model('Task', taskSchema);

export default Task;