import {Schema, model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullname:{
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be atleast 5 character'],
        maxLength: [30, 'Name must not be greater than 30 character'],
        lowercase: true,
        trim: true
    },
    email:{
        type: 'String',
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter a valid email id'],
    },
    password:{
        type: 'String',
        required: [true, 'Please enter a password to continue'],
        password: [8, 'Password must be atleast 8 characters'],
        select: false // password is not shown by default
    },
    avatar:{
        publicId: {
            type:'String'
        },
        secureURL:{
            type: 'String'
        },
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    fotgotPasswordExpiry: Date
},{
    timestamps: true
});

// before saving the data to database

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// generic methods

userSchema.methods = {
    generateJWTtoken: function() {
        return jwt.sign(
            {id: this._id, email: this.email, role: this.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRY}
    )        
    },
    comparePassword: async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password)
    }
}

const User = model('User', userSchema);

export default User;