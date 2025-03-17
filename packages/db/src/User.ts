import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: ObjectId,
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  date: Date
});

UserSchema.pre('save', function(next) {
	doc.date = new Date();
	next();
});