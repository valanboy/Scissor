import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = process.env.PORT || 3000

app.get("/", (req, res)=>{
    res.send("lets get going now man")
})

app.listen(port, ()=>{
console.log(`server started at port https://localhost/${port}`)})