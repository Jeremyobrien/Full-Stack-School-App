const express = require('express');
const router = express.Router();
const { Course, User } = require('../models');
const { check, validationResult } = require('express-validator');
const { authenticateUser } = require('../middleware/auth-user');

//Handles requests and passes errors to global handler
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        // Forward error to the global error handler
        next(err);
      }
    }
  }

//returns list of courses
router.get('/', asyncHandler(async (req, res) =>{
    const courses = await Course.findAll({
                            attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
                            include: [{model: User, as: 'userInfo', attributes: ['id','firstName', 'lastName', 'emailAddress']}]
                        });
    res.json(courses);
}));

//returns a specific course given the requested id
router.get('/:id', asyncHandler(async (req, res) =>{
    const course = await Course.findByPk(req.params.id, { attributes: ['id','title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
                                                          include: [{model: User, as: 'userInfo', attributes: ['id', 'firstName', 'lastName', 'emailAddress']}]                                                   
                                                        });
    if (course){
        res.location(`courses/${req.params.id}`)
           .json(course);
    } else {
        res.status(404)
           .json({ message: 'The course you requested cannot be found.'});
    }
}));

//Allows authenticated users to create a new course
router.post('/', authenticateUser, [
    check('title')
        .exists()
        .withMessage('Please provide a value for "title"'),
    check('description')
        .exists()
        .withMessage('Please provide a value for "description"')
], asyncHandler(async (req, res)=> {
    const errors = validationResult(req);
    const data = req.body;

    if ( !errors.isEmpty()) {
      const errorMessages = errors.array().map( error => error.msg);
      res.status(400).json({ errors: errorMessages });
    }
        const course = await Course.create({
            title: data.course.title,
            description: data.course.description,
            estimatedTime: data.course.estimatedTime,
            materialsNeeded: data.course.materialsNeeded,
            userId: data.id.id
        });
        console.log(course.toJSON());
        if (course) {
            await res.status(201)
                    .location(`/${course.id}`)
                    .end();
        }
}));

//allows authenticated users to update course information
router.put('/:id', authenticateUser, asyncHandler( async (req, res) => {
    if ( !req.body.course.title || !req.body.course.description) {
        res.status(400).json({ message: '"Title" and "Description" values required'})
    } else {
    const user = await req.currentUser;
    const course = await Course.findByPk(req.params.id);
    if (course && user.id === course.userId) {
        course.title = req.body.course.title;
        course.description = req.body.course.description;
        course.estimatedTime = req.body.course.estimatedTime;
        course.materialsNeeded = req.body.course.materialsNeeded;
        course.userId = req.body.id.id;
        await course.save();
        res.status(204).end();
    } else {
        res.status(403).json({ message: "You are not authorized to update this course information"});
    }
}
}))

//Allows authenticated users to delete courses
router.delete('/:id', authenticateUser, asyncHandler( async (req, res) => {
    const user = await req.currentUser;
    const course = await Course.findByPk(req.params.id);
    if (course && user.id === course.userId) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(403).json({ message: "You are not authorized to delete this course"})
    }
}));


module.exports = router;