import express from 'express'
import userController from '../Controllers/user.controller.js'
import passport from '../Config/passport.js';
const router = express.Router()

router.post('/signup', userController.signUp)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }), 
function(req, res){
    res.json({ success: true, message: 'Logged In' });
    });
// check authentication and return user
router.get('/', passport.checkAuthentication, (req, res) => {
    return res.send(`Welcome to home page ${req.user}`)
})
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        } else {
            return res.json({success:true,message:"Logged out."})
        }
    }) 
})
// router.get('/logout', userController.logout)

export default router