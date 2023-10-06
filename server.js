import express from 'express'
import route from './Routes/index.js'
import multer from 'multer'
import {connectUsingMongoose} from './Config/mongoose.js'
// Setup the express instance
const app = express()
// used to receive the multipart form data using the Postman
const upload = multer()
app.use(upload.none())
// Send request to the index route
app.use('/', route)
// Converting and using body data
app.use(express.urlencoded({extended:true}))
// OPen the server on port 3000
const startServer = async () => {
    try {
        await connectUsingMongoose();
        app.listen(3000, () => {
        console.log("Server is listening at port no. 3000");
    })} catch (error) {
        console.error("An error occurred:", error);
        if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
        process.exit(1)
    }
};

startServer()