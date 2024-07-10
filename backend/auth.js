const jwt = require("jsonwebtoken");


const auth=(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token)
        {
            res.status(401).json({ msg: "No token found, authorization denied." });
        }

        const verified=jwt.verify(token,process.env.SECRET_KEY);
        if(!verified){
            res.status(401).json({ msg: "No token Matched, authorization denied." });
        }

        req.UserId=verified.id;
        next();
    }catch(err)
    {
        console.log(err)
    }

}

module.exports=auth;