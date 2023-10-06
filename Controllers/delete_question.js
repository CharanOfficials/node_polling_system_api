import Question from "../Models/questions.js"
import Option from "../Models/options.js"
import Vote from "../Models/vote.js"

const delete_Question = async function (req, res) {
    try { // Check for valid id
        const id = req.params.id
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid Id"
            })
        }
        // Fetch all the options
        const options = await Option.find({ question: id })
        // delete all the votes first
        for (let i of options) {
            const vote = await Vote.findOne({ 'option': i._id })
            await Vote.deleteOne({'option':i._id})
            await Option.findByIdAndUpdate(i._id, { $pull: { votes: vote._id } })
        }
        // Delete options
        await Option.deleteMany({ question: id })
        // Delete question
        const deletedQues = await Question.findByIdAndDelete(id)
        // return results
        if (deletedQues) {
            return res.status(200).json({
            data: deletedQues,
            message: "Question deleted"
        })
        } else {
            return res.status(404).json({
            message: "Question not found"
        })
        }

    } catch (err) {
        console.log("Error while deleting the question",err)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default {
    delete_Question
}