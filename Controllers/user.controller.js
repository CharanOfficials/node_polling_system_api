import User from '../Models/user.js'
const signUp = function (req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Invalid username/ password" })
        }
        const user = User.create({
            email: email,
            password: password
        })
        return res.status(200).json({ success: true, message: "User registered successfully." })
    } catch (err) {
        console.log("Error while registering the user", err)
        return res.status(500).json({success:true, message:"Server error occured."})
    }
}

const signIn = async function (req, res) {
    try {
        const { email, password } = req.body
        if (req.session.user && req.session.user === email) {
            return res.status(200).send(`${req.session.user} already signed in.`)
        }
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Invalid username/ password" })
        }
        const user = await User.findOne({
            email: email,
            password:password
        })
        
        if (user) {
            req.session.user = user.email
            return res.status(200).json({ success: true, message: "User signed in successfully." })
        } else {
            return res.status(404).json({ success: false, message: "Invalid User." })
        }
    } catch (err) {
        console.log("Error while registering the user", err)
        return res.status(500).json({success:true, message:"Server error occured."})
    }
}
const logout = function (req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.send("Error while logging out.")
        }
        return res.send("Logged out successfully")
    })
}
export default {
    signIn, signUp, logout
}