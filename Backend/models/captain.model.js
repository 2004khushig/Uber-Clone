const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters']
        },
        lastname:{
            type:String,
            minLength:[3,'Last name must be at least 3 characters'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketID:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 characters']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate must be at least 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['Car','Auto','Motorcycle']
        }
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }

});


captainSchema.methods.generateAuthToken=function(){
    const token =jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model('captain',captainSchema);
module.exports=captainModel;