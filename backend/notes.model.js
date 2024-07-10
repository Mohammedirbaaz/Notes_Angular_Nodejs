const mongoose=require('mongoose');

const schema=mongoose.Schema;

const notesSchema=new schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    notes:{type:String,required:true},
},{ 
    timestamps:true,
});
const notesSchema1=mongoose.model('notes',notesSchema);
module.exports=notesSchema1;