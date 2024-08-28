const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://bro123:pratham@pratham.j9fifsz.mongodb.net/');

if(mongoose.connect){
    console.log("Connected to MongoDB");
}

// Define schemas
const AdminSchema = new mongoose.Schema({
    email:String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    // Schema definition herede
    title:String,
    description:String,
    imageLink: String,
    price:Number

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}