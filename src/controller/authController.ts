import { Request, Response} from 'express';


module.exports.login_GET =  (req:Request, res:Response)=>{
    res.render('login&registration', {title: "login",
layout:"./layouts/loginLayout"
}) 
}