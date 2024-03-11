module.exports.login_GET =  (req:Express.Request, res:Express.Response)=>{
    res.render('login&registration', {title: "login",
layout:"./layouts/loginLayout"
}) 
}