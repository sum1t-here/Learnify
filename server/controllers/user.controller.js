import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const cookieoptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
}

export const register =  async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;

        if(!fullname || !email || !password){
            return next(new AppError("Fill in all the details to register"));
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return next(new AppError('Email already exists', 400));
        }

        const user = await User.create({
            fullname,
            email,
            password,
            avatar:{
                publicId: email,
                secureURL: 'https://www.pikpng.com/pngvi/iTmixmw_person-business-avatar-anonymous-png-image-person-black/'
            }
        })

        if(!user){
            return next(new AppError('User not created, Please try again', 500))
        }
        
        if(req.file){
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })

                if(result){
                    user.avatar.publicId = result.public_id;
                    user.avatar.secureURL = result.secure_url;

                    // remove file from the folder
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (err) {
                return next(new AppError(err || 'File not uploaded, please try again', 500));
            }
        }

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTtoken();

        res.cookie('token', token, cookieoptions)

        res.status(201).json({
            success: true,
            message: 'User Registered successfully !!!',
            user: {
                id : user._id,
                name : user.fullname,
                email: user.email,
                avatar: user.avatar
            }
        })
    } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'Registration failed !!!',
                error: err.message
            });
        }
}

export const login = async (req, res, next) => {
    try {
        const {email, password}  = req.body;

        if(!password || !email){
            return next(new AppError('Fill in all the details to login'));
        }

        const user = await User.findOne({email}).select('+password');

        if (!user || !user.comparePassword){
            return next(new AppError('Email or password doesnot match', 400));
        }

        const token = await user.generateJWTtoken();
        user.password = undefined;

        res.cookie('token', token, cookieoptions);

        res.status(201).json({
            success: true,
            message: 'User logged in successfully!!',
            user
        })
    } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'Login failed !!!',
                err: err.message
            });
        };
}

export const logout = (req, res, next) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(201).json({
        success: true,
        message: 'Logged out successfully !!!'
    })
}

export const getProfile = async (req, res, next) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);

    res.status(201).json({
        success: true,
        message: 'User detail',
        user
    })
  } catch (err) {
    return next(new AppError('Failed to fetch user details !!!', 404));
  }
}
