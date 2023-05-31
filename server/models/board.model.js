import mongoose from 'mongoose'


const boardSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
        default:'📔'
    },
    title:{
        type: String,
        default:'Sem nome'
    },
    description:{
        type: String,
        default:`Adicione uma descrição...`
    },
    position:{
        type:Number
    },
    favourite:{
        type:Boolean,
        default:false
    },
    favouritePosition:{
        type:Number,
        default:0
    }    
},{
    timestamps: true
}
)

const Board = mongoose.model('Board', boardSchema);

export default Board;