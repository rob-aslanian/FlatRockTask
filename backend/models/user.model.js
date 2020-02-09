const mongose = require('mongoose'),
      Shcema = mongose.Schema;

let UserSchema = Shcema({
    avatar:{
        type:String,
        default:null,
    },
    firstname:{
        type:String,
        required: true,
        trim:true,
    },
    lastname:{
        type:String,
        required: true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required: true,
        trim:true,
        lowercase:true,
    },
    role:{
        type:String,
        default:"user",
        lowercase:true,
    },
    permissions:{
        type:{},
    },
    is_active:{ 
        type:Boolean,
        default:true, 
    }
})

module.exports = mongose.model('User' , UserSchema)