import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    title:{
        type: String,
        default:''
    }
    
},{
    timestamps: true
}
)

const Section = mongoose.model('Section', sectionSchema);

export default Section;