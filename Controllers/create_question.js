import Question from '../Models/questions.js'

// Add question in DB
const add_question = async function (req, res) {
    try {
        // Form data
        const question = req.body.question
        // Create a question and retttturn results
        const ques = await Question.create({
            question: question
        })
        return res.status(200).json({
            data: ques,
            message: "Question added"
        })
    } catch (err) {
        console.log("Error while saving the question",err)
        return res.status(500).json({message:"Internal server error"})
    }
}

export default {
    add_question
}