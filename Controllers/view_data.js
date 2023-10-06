import Question from "../Models/questions.js";

const viewData = async function (req, res) {
    try {
        // check id length to get the correct Object id
        const id = req.params.id
        if (id.length < 24) {
            return res.status(404).json({
                message: "Invalid option id."
            })
        }
        // Check if question exists
        const question = await Question.findOne({ _id: id })
            .select({ __v: 0 })
            .populate({
                path: 'options',
                select: { '__v':0, 'question': 0 },
                populate: { path: 'votes', select:{'__v':0, 'option':0, '_id':0} }
            })
        // if question exists then make a copy of the result fetched to build the data as per the requirements
        if (question) {
            let copyQuestion = JSON.parse(JSON.stringify(question))
            // Update internal array data
            for (let i of copyQuestion.options) {
                i.id = i._id
                i.text = i.content
                // Correct this if any new field get added or apply the filter
                i.votes = Number(i.votes[0].vote) 
                // Dynamically add link
                i.link_to_vote = `https://pollingapi-yx82.onrender.com/options/${i._id}/add_vote`
                delete i._id; delete i.content
            }
            // build the data for outside the options array
                copyQuestion = {id: copyQuestion._id, title:copyQuestion.question, ...copyQuestion}
                delete copyQuestion._id;  delete copyQuestion.question
                return res.status(200).json({
                    data:copyQuestion,
                })
        } else { // If no question id found
            return res.status(200).json({message:"Question not found."})
        }
    } catch (err) { // If any error occured
        console.log("Error while deleting the option",err)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default {
    viewData
}