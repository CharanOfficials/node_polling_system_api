// Question -> Options -> Vote instance contains votes count
// We used array of Options with the name votes though just in case if we want to store the vote related information as well
import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    vote: {
        type: Number,
        required:true
    },
    option: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required:true
    }
}, {
    timeStamp:true
})
const Vote = mongoose.model('Vote', voteSchema)
export default Vote