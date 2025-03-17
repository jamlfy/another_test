import mongoose from 'mongoose';
const { Schema } = mongoose;

const StockSchema = new Schema({
  tick: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: string,
  },
  date: Date
});
StockSchema.pre('save', function(next, doc) {
	doc.date = new Date();
	next();
});

export default  mongoose.model('Stock', StockSchema);