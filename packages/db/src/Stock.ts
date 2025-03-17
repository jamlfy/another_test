import mongoose from 'mongoose';
const { Schema } = mongoose;

const StockSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  buyer: { 
    type: Schema.Types.ObjectId, 
    ref: 'users',
    required: true,
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
StockSchema.path('seller').required(function() { return this.where === 'trans'; });
StockSchema.pre('save', function(next) {
	doc.date = new Date();
	next();
});

export default  mongoose.model('stock', StockSchema);