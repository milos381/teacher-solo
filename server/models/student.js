const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
    type: String,
    required: true  
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
      }
    // ,
    // subjects: [
    //   {
    //     subjectId: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Subject',
    //       required: true
    //     }
    //   }
    // ]
});

studentSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Student', studentSchema);