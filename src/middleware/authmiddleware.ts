import { NextFunction } from 'express';
const user = require("../model/user")
import { ErrorRequestHandler, Request, Response } from 'express';
import jsonwebtoken, { sign, Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from"dotenv"
dotenv.config()

const JwtSecret = process.env.JwtSecret

const requireAuth = (req:Request, res:Response, next:NextFunction) => {
const token = req.cookies.jwt


//check json web token exists & is verified
if(token){
    jsonwebtoken.verify(token, JwtSecret!, (err:any, decodedToken:any)=>{
      if(err){
        console.log(err.message)
        res.redirect("/login")
      }else{
        console.log(decodedToken)
        next()
      }
    })
}
else{
res.redirect("/login")
}

}

//check current user
const checkUser = (req:Request, res:Response, next:NextFunction) =>{
  const token = req.cookies.jwt
  if(token){
    jsonwebtoken.verify(token, JwtSecret!, async (err:any, decodedToken:any)=>{
      if(err){
        console.log(err.message)
        res.locals.User = null
        next()
      }else{
        console.log(decodedToken)
        let User = await user.findById(decodedToken.id)
        res.locals.User = User
        next()
      }
    })
  }else{
    res.locals.User = null
    next()
  }
}

module.exports = {requireAuth, checkUser}