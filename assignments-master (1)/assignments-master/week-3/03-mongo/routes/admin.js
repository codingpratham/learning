const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
import { Admin ,Course} from "../db";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.headers.username
    const password=req.headers.password

    await Admin.create({
       username: username,
        password: password
    })

    res.json({
        msg: 'success',
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description
    const imageLink=req.body.imageLink;
    const price=req.body.price;

    const NewCourse= await Course.create({
        title,
        description,
        imageLink,
        price,
    })

    res.json({
        msg: 'success',
        courseId: NewCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses= await Course.find({})

    res.json({
        courses
    })
});

module.exports = router;