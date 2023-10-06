// Pass request to the concerned controller
import express from 'express'
const router = express.Router()
import AddQuestionController from '../Controllers/create_question.js'
import DeleteQuestionController from '../Controllers/delete_question.js'
import AddOptionController from '../Controllers/add_option.js'
import ViewDataController from '../Controllers/view_data.js'

// To add a question
router.post('/create', AddQuestionController.add_question)
// To delete a question using question id
router.delete('/:id/delete', DeleteQuestionController.delete_Question)
//  To add an option using question id
router.put('/:id/options/create', AddOptionController.addOption)
// To view data using question id
router.get('/:id', ViewDataController.viewData)

export default router