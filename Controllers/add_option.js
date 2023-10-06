import Option from '../Models/options.js'
import Question from '../Models/questions.js'
import Vote from '../Models/vote.js'

const addOption = async function (req, res) {
    try {
        const id = req.params.id
        // Check valid id length
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid Id"
            })
        }
        // Check for question
        const question = await Question.findOne({ _id: id })
        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            })
        }
        //  If question then create an option
        if (question) {
            const option = await Option.create({
                question:id,
                content: req.body.option
            })
            // If option build then create vote and push in option and also push the option in question
            if (option) {
                const addedVote = await Vote.create({
                    option: option._id,
                    vote:0
                })
                option.votes.push(addedVote)
                await option.save()
                question.options.push(option)
                await question.save()
                return res.status(200).json({
                data: question,
                message: "Option Added"
            })  
        }}
    } catch (err) {
        console.log("Error while adding the option", err)
        res.status(500).json({message:"Internal server error"})
    }
}
export default {
    addOption
}