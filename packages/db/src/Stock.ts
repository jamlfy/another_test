import mongoose from 'mongoose';
const { Schema } = mongoose;

const StockSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  bayer: { 
    type: Schema.Types.ObjectId, 
    ref: 'users' 
  },
  where: {
    type: String,
    enum: ["trans", "init"],
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    validate: {
      validator: function(v) {
        return v > 0;
      },
    },
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
    validate: {
      validator: function(v) {
        return v > 0;
      },
    },
  },
  date: Date
});

StockSchema.pre('save', function(next) {
	doc.date = new Date();
	next();
});