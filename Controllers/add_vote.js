import Vote from '../Models/vote.js'
import Option from '../Models/options.js'

const addVote = async function (req, res) {
    try {
        const id = req.params.id
        // Check for valid id length
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid Id"
            })
        }
        // Return if no option found
        const option = await Option.findOne({ _id: id })
        if (!option) {
            return res.status(404).json({
                message: "Option not found"
            })
        }
        else {
            let newVote = await Vote.findOne({ 'option': option._id })
            // Increment if vote exists
            if (newVote) {
                newVote.vote += 1
                await newVote.save()
            }
            // Create a vote in case if delete option don't removed the vote id
            else {
                newVote = await Vote.create({
                    option: option._id,
                    vote:1
                })
                option.votes.push(newVote)
                await option.save()
            } // return results
            return res.status(200).json({
                data:newVote,
                message: "Vote added."
            })
        }

    } catch (err) {
        console.log("Error while adding the vote", err)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default {
    addVote
}