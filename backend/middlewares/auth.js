const app = require("express")();
const jwt = require("jsonwebtoken");

const auth = app.use((req,res,next)=>{
    
    try {

        let token = req.headers.authorization;

        if(token){

            token = token.split(" ")[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;  
            
            //if the token is incorrect then the catch block will execute
        }
        else{
            return res.status(401).json({message: "Unauthorized user"});
        }
        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({message: "Unauthorized user"});

    }
});

module.exports = auth;
