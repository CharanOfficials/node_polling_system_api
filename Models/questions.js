// Question -> Options -> Vote instance contains votes count
// We used array of Options with the name votes though just in case if we want to store the vote related information as well
import mongoose from "mongoose";
// Create Schema
const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    // Save cross reference for options
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option',
            required: true
        }
    ]
}, { timeStamp: true })

// Save model using the created schema
const Question = mongoose.model('Questions', questionsSchema)

// Create instance
export default Question