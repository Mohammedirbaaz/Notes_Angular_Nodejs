const router=require("express").Router();
const Notes=require('./notes.model.js');
const auth=require('./auth.js')

router.route("/add").post(auth,async(req,res)=>{
    console.log(req.body.title+","+req.body.notes+","+req.UserId);
    var obj={
        id:req.UserId,
        title:req.body.title,
        notes:req.body.notes
    };

    const notes=new Notes(obj);

    await notes.save().then(res1=>{
        res.send(res1);
        return;
    }).catch(err=>{
        res.send(err);
        return;
    })
});

router.route("/getAll").get(auth,async(req,res)=>{
    console.log(req.UserId);
    const listofnotes=await Notes.find({id:req.UserId});
    console.log(listofnotes)
    res.send(listofnotes);
});

module.exports=router;