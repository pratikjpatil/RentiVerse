const app = require("express")();
const jwt = require("jsonwebtoken");

const auth = app.use((req,res,next)=>{
    
    try {
        const token = req.cookies.token;
        
        if(token){

            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user; 
            
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
