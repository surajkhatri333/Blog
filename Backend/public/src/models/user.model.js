import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
// schema for use 

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    }
});



// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     this.password = bcrypt.hash(this.password, 8)  //encrypt password
//     next();
// })

// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

userSchema.methods.generateAccessToken = function(){
    jwt.sign (
        {
        
            email: this.email,
            username : this.username,
          
        },
        process.env.ACCESS_TOEKN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }


    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign (
        {
          
            email: this.email,
            username : this.username,
   
        },
        process.env.REFRESH_TOEKN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }


    )
}


export const User = mongoose.model("User", userSchema);