const router=require("express").Router();
const UserSchema=require("./user.model.js");
const jwt=require('jsonwebtoken');

router.get("/all",async(req,res)=>{
    res.send("lols");
});
router.route("/register").post(async (req,res)=>{
    var name=req.body.obj.name;
    var phno=req.body.obj.phno;
    var password=req.body.obj.password;
    var email=req.body.obj.email;

    
    var newuser=new UserSchema({name,password,phno,email});

    const result= await UserSchema.findOne({email:email});
    if(result)
    {
        res.send("Already registered!");
        return;
    }
    
    newuser.save().then(ress=>{
        res.send("successfully registered!");
    }).catch(err=>{
        res.send("Unable to register :(");
        console.log(err);
    });
});

router.route("/login").post(async(req,res)=>{

    var email=req.body.email;
    var password=req.body.password;
    const result= await UserSchema.findOne({email:email,password:password});
    console.log(req.body);
    if(result)
    {
        console.log(result);
        var ids2=result._id;
        const tokenf=jwt.sign({id:ids2},process.env.SECRET_KEY);
        console.log(tokenf);
        res.cookie("token",tokenf,{
            // httpOnly:true,
            sameSite:'lax',
            // secure:true,
            path: '/',
            maxAge:24 * 60 * 60 * 1000
        }).send(true);
        return;
    }
    else res.send(false);
});

router.route("/logout").get(async(req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax', // or 'none' if required
        secure: true // Uncomment if using HTTPS
    }).send(true);
    return;
})

module.exports=router;