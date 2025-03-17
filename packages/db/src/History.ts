import mongoose from 'mongoose';
const { Schema } = mongoose;

const HistoryStockSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  where: {
    type: String,
    enum: ['trans', 'init'],
    required: true,
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
    },
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
    },
  },
  date: Date,
});
HistoryStockSchema.path('seller').required(function () {
  return this.where === 'trans';
});
HistoryStockSchema.pre('save', function (next, doc) {
  doc.date = new Date();
  next();
});

export default mongoose.model('HistoryStock', HistoryStockSchema);
