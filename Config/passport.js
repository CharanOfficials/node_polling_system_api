import passport from "passport";
import LocalStrategy from 'passport-local'
import User from "../Models/user.js";

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done){
    try {
        if (!email || !password) {
            return done(null, false, "Please enter a valid email and password.")
        }
        email = email.trim()
        password = password.trim()
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, "Please enter a valid user.")
        }
        if (user.password !== password) {
            return done(null, false, "Please enter a valid user.")
        }
        else {
            return done(null, user)
        }
    } catch (err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, "Invalid user")
        } else {
            done(null, user)
        }
    } catch (err) {
        return done(err)
    }
})
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return next("You need to logged in")
    }
}
export default passport