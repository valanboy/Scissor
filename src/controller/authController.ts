import { ErrorRequestHandler, Request, Response } from 'express';
import qrcode from "qrcode"
const user = require("../model/user")
const shortUrl = require("../model/shortUrl")
import jsonwebtoken, { sign, Secret, JwtPayload } from 'jsonwebtoken';
import bcryptjs from "bcryptjs"
import dotenv from"dotenv"
dotenv.config()

const JwtSecret = process.env.JwtSecret

//create json token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id: string) => {

    return jsonwebtoken.sign({ id }, JwtSecret!, {
        expiresIn: maxAge
    })
}

module.exports.home_GET = (req: Request, res: Response) => {
    res.render('index', {
        title: "homepage"
    })
}

module.exports.login_GET = (req: Request, res: Response) => {
    res.render('login.ejs', {
        title: "login",
        layout: "./layouts/loginLayout",
        error : ""
    })
}


module.exports.signup_GET = (req: Request, res: Response) => {
    res.render('registration.ejs', {
        title: "signup",
        layout: "./layouts/loginLayout",
        error: ""
    })
}

module.exports.signup_POST = async (req: Request, res: Response) => {
    try {
              
            let { email, password, username } = req.body

            const emailAlreadyExist = await user.findOne({email:email})
            if (emailAlreadyExist){
                res.render('registration.ejs', {
                    
                        title: "signup",
                        layout: "./layouts/loginLayout",
                        error: "email already exists"
                    
                })
            }
            
            else if(!emailAlreadyExist){

        
            //creating a new user
            const User = await user.create({ email, username, password })
    
            //creating a jwt token with the call back funtion initialised a the start of the code
            const token = createToken(User._id)
    
            //sending the jwt token as cookie to be saved in the client browser making the req.
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    
            await res.status(200).redirect('/login')
            }
        }
          

     catch (error) {
        // const errors = handleErrors(err)
        // res.status(400).json({ error })
        console.log(error)
    }
}

module.exports.login_POST = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

    const User = await user.findOne({email: email})

    if(!User){
        // res.send("no user")
        res.render("login",{
            title: "login",
        layout: "./layouts/loginLayout",
        error: "user not found, please sign up"
        })
     }

    // if(!User){ res.redirect("/signup")}
    if(User){
        const dbpassword = User.password
      const comparedPassword = await bcryptjs.compare(password, dbpassword)
    
     if(User && comparedPassword === true) {
         //creating a jwt token with the call back funtion initialised a the start of the code
         const token = createToken(User._id)
    
         //sending the jwt token as cookie to be saved in the client browser making the req.
         res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.redirect(`/urlshrinker?username=${encodeURIComponent(User.username)}`)}
     else if(user && comparedPassword === false){
        res.render("login",{
            title: "login",
        layout: "./layouts/loginLayout",
        error: "incorrect username or password"
        })
        // res.redirect("/login")
     }

     
    }
    } catch (error) {
        console.log(error)
    }
}


module.exports.urlShrinker_GET = async (req: Request, res: Response) => {
    // Extract the username from the query parameters
    const username = req.query.username;

    const shortUrls = await shortUrl.find()
    res.render('urlShrinker.ejs', {
        title: "url Shrinker",
        layout: "./layouts/urlshrinkerLayout.ejs",
        shortUrls: shortUrls,
        user: username
    })
}


module.exports.shorturls_POST = async (req: Request, res: Response) => {
    await shortUrl.create({full: req.body.fullUrl})
    res.redirect('/urlshrinker')
}

module.exports.logout_GET = async (req: Request, res: Response) =>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect("/")
    }


module.exports.shorturls_GET = async (req: Request, res: Response) => {
    const shorturl = await shortUrl.findOne({ short: req.params.shortUrl})
    if(shorturl === null) return res.render('404',{
        title: "404"
    })

    shorturl.clicks++
    shorturl.save()
    res.redirect(shorturl.full)
}


    module.exports.allOtherRoutes_GET = async (req: Request, res: Response) => {
        res.render('404',{
            title:"page not found",
            layout: "./layouts/layout"
        })
    }