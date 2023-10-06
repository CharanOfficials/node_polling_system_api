import Vote from '../Models/vote.js'
import Option from '../Models/options.js'
const removeVote = async function (req, res) {
    try {
        // Check for correct id length
        const id = req.params.id
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid Id"
            })
        }
        // Search for the valid option
        const option = await Option.findOne({ _id: id })
        // Retuen if no option found
        if (!option) {
            return res.status(404).json({
                message: "Option not found"
            })
        }
        else {
            // Check if vote already exists
            const addedVote = await Vote.findOne({ 'option': option._id })
            // decrement only if vote is present and avoid negative values
            if (addedVote && addedVote.vote > 0) {
                addedVote.vote -= 1
                await addedVote.save()
            } else { // if no vote is found
                return res.status(200).json({
                    data:addedVote,
                    message: "No vote found."
            })
            }
            // return if vote removed
            return res.status(200).json({
                data:addedVote,
                message: "Vote removed."
            })
        }

    } catch (err) {
        console.log("Error while removing the vote", err)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default {
    removeVote
}