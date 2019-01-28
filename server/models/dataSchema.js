var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    bloodgroup:{type:String},
    address:{type:String},
    contact:{type:String},
    role:{type:String},
    list:{type:Array},
    list_approve:{type:Array}
});

module.exports=mongoose.model('user',userSchema);