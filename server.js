// Imports Express
import express from "express"
// Import Cors
import cors from "cors"
// Import User router
import User_Router from "./routes/Users/userRouter.js";
// Import product router 
import product_Router from "./routes/Products/productsRouter.js";
// Import env config so that env works
import {configDotenv} from "dotenv";

configDotenv()
// Set Express in variable name app
const app = express()
app.use(express.json())
// Set Port where is application live
const PORT = process.env.PORT ;

// Create Home Api
app.get("/" , (req , res) => {
    res.send({message: "BAckend application use: [/api/v1/users] to get all users and use [/api/v1/user/ id] to get single user use [/api/v1/products] to get all prducts and use [/api/v1/product/ id] to get single product"})
})
// Use cors in express 
app.use(cors())

/* All Api */

// Users Api
app.use('/api/v1' , User_Router)
// Products Api
app.use('/api/v1' , product_Router)

// Make not found error handling Api
app.use((req, res) => {
    res.status(404).send({ status: 404, message: "Api route not found" })
})

// Make error handling Api
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).send({ status: 400, message: "Invalid JSON format" })
    }

    console.error(err)
    res.status(500).send({ status: 500, message: "Internal server error" })
})


// Set Port to localhost so it runs in: { localhost:1000 }
app.listen(PORT , () => {
    console.log(`The Server is Runing on ${PORT} `);
})
