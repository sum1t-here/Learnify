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
        },
        secureURL:{
            type: String,
        }
    },
    lectures:[
        {
            title: String,
            description: String,
            lecture:{
                publicId: {
                    type: String,
                },
                secureURL:{
                    type: String,
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