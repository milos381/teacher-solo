const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') //protect password
// const crypto = require('crypto') //token
const sgMail = require('@sendgrid/mail') //send confirmation email
const validator = require('email-validator')

const Teacher = require('../models/teacher');
const Student = require('../models/student');
// const { userInfo } = require('os');

let API_KEY = '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'
sgMail.setApiKey(API_KEY)

exports.teacherList = (req, res, next) => {
    Teacher.find()
    .then(teacher => {
        return res.send(teacher)
    })
    .catch(err => console.log(err));
}

exports.postLogin = (req, res, next) => {
    
    const id = mongoose.Types.ObjectId(req.body.teacherId)
    const password = req.body.password
    Teacher.findOne({_id: id})
    .then(user => {
        bcrypt.compare(password, user.password) 
        .then((result)=>{
            if(result){
              console.log("authentication successful", user)
              req.session.isLoggedInSession = true
              req.session.user = user
              return req.session.save(err => {
                console.log(err);
                res.send(user)
              });
            //   Student.find({teacherId: id})
            //   .then((students) => {
            //       console.log('students', students)
            //     res.send(students)
            //   })
            } else {
              console.log("authentication failed. Password doesn't match")
              res.send(501)
            }
          })
          .catch((err)=>console.error(err))
    })
    .catch(err => console.log('this is an error', err));
}

exports.validate = (req, res, next) => {
    if(validator.validate(req.body.email)){
      console.log('PASSED')
      next()
    } else {
      res.sendStatus(403)
    }
  }

exports.postSignup = (req, res, next) => {
 
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
  
    Teacher.findOne({email: email})
    .then((data) => {
        if(!data){
            return bcrypt.hash(password, 12)
            .then((savedPass) => {
                const teacher = new Teacher({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: savedPass
                })
                req.session.isLoggedInSession = true
                req.session.user = teacher

                return teacher.save()
            })
            .then((result) => {
                sgMail.send({
                    to: email,
                    from: 'milospopovic.us@gmail.com',
                    subject: 'Success!',
                    html: '<h1>Sucessfully signed up!</h1>'
                  })
                res.send(result)
                })
                .then(() => {
                    console.log('Email sent')
                })
            .catch((error) => {
                  console.error(error)
            })
        } else {
            console.log('email in use')
            res.send('email in use...')
        }

    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
}
