import {model, Schema} from 'mongoose';

const courseSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
    },
    category:{
        type: String,
        required: [true, 'Category is required'],
    },
    thumbnail:{
        publicId: {
            type: String,
            required: true,
        },
        secureURL:{
            type: String,
            required: true,
        }
    },
    lectures:[
        {
            title: String,
            description: String,
            lecture:{
                publicId: {
                    type: String,
                    required: true,
                },
                secureURL:{
                    type: String,
                    required: true,
                }
            }
        }
    ],
    numberOfLectures:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: [true, 'Author name is required'],
    }
},{timestamps: true});

const Course = model('Course', courseSchema);

export default Course;