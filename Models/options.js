import mongoose from "mongoose";
// Question -> Options -> Vote instance contains votes count
// We used array of Options with the name votes though just in case if we want to store the vote related information as well
const optionsSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions',
        required:true
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote',
            required:true
        }
    ]
}, {
    timeStamp: true
})

const Option = mongoose.model('Option', optionsSchema)
export default Option