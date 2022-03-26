const Teacher = require('../models/teacher');
const Student = require('../models/student');
const mongoose = require('mongoose');
const Cookies = require ('universal-cookie');


exports.getStudent = (req, res, next) => {
  let id = req.params.id
  Student.findById(id)
  .then(student => {
      res.send(student)
  })
  .catch(err => console.log(err));
}

exports.checkCookie = (req, res, next) => {
  if(req.session.user){
    console.log('PASSED')
    next()
  } else {
    res.sendStatus(404)
  }
}

exports.getClass = (req, res, next) => {
  // const cookies = new Cookies(req.headers.cookie);
 
  Student.find({teacherId: mongoose.Types.ObjectId(req.session.user._id) })
    .then(pupils => {
      return res.status(200).send(pupils);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postAddStudent = (req, res, next) => {
  const cookies = new Cookies(req.headers.cookie);
  console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const student = new Student({
      
      firstName: firstName,
      lastName: lastName,
      teacherId: mongoose.Types.ObjectId(req.session.user._id)
    });
    student
      .save()
      .then(stud => {
        // console.log(result);
        console.log('Created Student');
        return res.send(stud)
      })
      .catch(err => console.log(err));
}


exports.postEditStudent = (req, res, next) => {
  console.log(req.params)
  const id = req.params.id;

  Student.findByIdAndUpdate(mongoose.Types.ObjectId(id), {firstName : req.body.firstName, lastName : req.body.lastName})
    .then((stud) => {
      return res.send(stud)
    })
    .catch(err => console.log(err));
}

exports.postDeleteStudent = (req, res, next) => {
  console.log(req.params)
  const id = req.params.id;
  let student = Student.findByIdAndRemove(id)
    .then((stud) => {
      console.log('DESTROYED PRODUCT', stud);
      return res.send(stud)
    })
    .catch(err => console.log(err));
}