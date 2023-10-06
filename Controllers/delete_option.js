import Option from '../Models/options.js'
import Question from '../Models/questions.js'
import Vote from '../Models/vote.js'

const deleteOption = async function (req, res) {
    try {
        // check id length to get the correct Object id
        const id = req.params.id
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid option id."
            })
        }
        // Find vote id to delete the record from array to avoid errors
        const vote = await Vote.findOne({ 'option': id })
        // delete votes 
        await Vote.deleteOne({'option':id})
        // delete votes from option
        const del = await Option.findByIdAndUpdate(id, { $pull: { votes: vote._id } })
        // delete the option
        const deletedOption = await Option.findByIdAndDelete(id)
        // Pull the option from the question and update the question
        await Question.findByIdAndUpdate(deletedOption.question, { $pull: { options: id } }, { new: true }) 
        // if deleted return true
        if (deletedOption) {
            return res.status(200).json({
            data: deletedOption,
            message: "Option deleted"
            })
        // return nothing to delete 
        } else {
            return res.status(404).json({
            message: "Option not found"
        })
        }
    } catch (err) {
        console.log("Error while deleting the option",err)
        return res.status(500).json({message:"Internal server error"})
    }
}

export default {
    deleteOption
}