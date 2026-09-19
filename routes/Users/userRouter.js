// Import Express
import express from "express"
// Import Users 
import { Users } from "./users.js"

import User_middleware from "../../Usermiddleware.js"

// Set express router in variable: User_router
const User_Router = express.Router()

User_Router.use("/users", User_middleware)
User_Router.use("/user", User_middleware)
// Make Users Api
User_Router.get("/users" , (req , res) => {
    if(!Users || Users.length === 0){
        return res.status(404).send({status: 404 , message: "Users not found"})
    }

    res.status(200).send({status: 200, message: "All users fetch suessfully" , data: Users})
})

// Mkae Serach Single Users
User_Router.get("/user/:id" , (req , res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({status: 400 , message: "Invalid user id" })
    }
    const user = Users.find(item => item.id === id)

    if(!user){
        return res.status(404).send({status: 404 , message: "User not found" })
    }

    res.status(200).send({status: 200 , message: "User fetch suessfully" , data: user})
})

// Make user post Api
User_Router.post("/user" , (req , res) => {
 const {name , age , email} = req.body

 // Check user data before add user
 if(!name || !email || !Number.isInteger(age) || age <= 0){
     return res.status(400).send({status:400 , message: "Valid user data is required"})
 }

 Users.push({id: Users.length + 1 , ...req.body})
 res.status(201).send({status:201 , message: "User Added Suessfully"})
})

// Make user Update Api
User_Router.put('/user/:id' , (req , res) => {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send({status: 400 , message: "Invalid user id"})
    }
    const userIndex = Users.findIndex(v => v.id === userId)
    if (userIndex === -1) {
        return res.status(404).send({status: 404 , message: "User not found"})
    }
    const {name , age , email} = req.body
    if(!name || !email || !Number.isInteger(age) || age <= 0){
        return res.status(400).send({status:400 , message: "Valid user data is required"})
    }
    Users.splice(userIndex , 1 , {id: userId , ...req.body})
    res.status(200).send({status:200 , message: "User Updated Suessfully"})                                                         
})

// Make user delet Api
User_Router.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = Users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ status:404 , message: "User not found" });
  }
  Users.splice(userIndex, 1);
  res.status(200).send({status:200 , message: "User deleted" });
});

// Export User router
export default User_Router