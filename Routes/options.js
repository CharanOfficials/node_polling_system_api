import express from 'express'
const router = express.Router()
import DeleteOptionController from '../Controllers/delete_option.js'
import AddVoteController from '../Controllers/add_vote.js'
import RemoveVoteController from '../Controllers/remove_vote.js'

// Always keep id nearby to the controller to get the req.params.id
// To delete the options using question id
router.delete('/:id/delete', DeleteOptionController.deleteOption)
// to add a vote using option id
router.get('/:id/add_vote', AddVoteController.addVote)
// To remove vote using option id
router.delete('/:id/remove_vote', RemoveVoteController.removeVote)
router.use('/', (req, res) => {
    res.status(404).json({success:false, message:"Invald Requested URL"})
})
export default router