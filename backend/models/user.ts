import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
export const userSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    name:{
        type:String    
    },
    email: {
        type:String 
    },
    address:{
        type:String  
    },
    password:{
        type:String
    },
    tokens:[{
        token:{
            type:String
        }
    }]
});
// userSchema.method({
//    async generateAuthToken() {
//           try{
//             let jwtSecretKey = process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login';
//             let data = {
//                 email:this.email,
//             }
//             const accessToken =  jwt.sign(data, jwtSecretKey,{expiresIn:'10m'});
//             this.tokens = this.tokens.concate({token:accessToken})
//             await this.save();
//             const tranformed = {};
//             const fields = ['id','name','email','password','tokens'];
//             fields.forEach((field)=>{
//                 tranformed[field] = this[field];
//             })
//             return tranformed;
//           }
//           catch(error){
//               console.log(error);
//           }
//     }

// }) 
const user = mongoose.model("users", userSchema);
export default user;
