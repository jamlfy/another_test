import Stock from '@another/db/Stock';
import History from '@another/db/History';

export const history = (req, res) => {
  const time = parseInt(req.query.time) ?? 15;

  History.aggregate([
    { $match: { stock: req.params.stock, field: { $exists: true } } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          dayOfYear: { $dayOfYear: '$date' },
          hour: { $hour: '$date' },
          interval: {
            $subtract: [
              { $minute: '$date' },
              { $mod: [{ $minute: '$date' }, time] },
            ],
          },
        },
        minPrice: { $min: { $divide: ['$price', '$amount'] } },
        maxPrice: { $max: { $divide: ['$price', '$amount'] } },
        averagePrice: { $avg: { $divide: ['$price', '$amount'] } },
      },
      count: { $sum: 1 },
    },
  ])
    .then((e) => res.json(e))
    .catch((error) =>
      res.status(404).json({
        error,
        message: 'Dont found',
      })
    );
};

export const info = (req, res) => {
  Stock.findOne({
    tick: req.params.stock,
  })
    .exec()
    .then((e) => {
      if (!e) {
        throw new Error('Dont found');
      }

      return res.json(e);
    })
    .catch((error) =>
      res.status(404).json({
        error,
        message: 'Dont found',
      })
    );
};

export const trade = (req, res) => {
  res.json({ message: 'in a next' });
};

export const buy = (socket) => (idPropose) => {
  const contr = await History.findById(idPropose);
  contr.buyer = socket.user._id;
  contr
    .save()
    .then((e) => socket.emit('buy', { id: e._id }))
    .catch((error) =>
      socket.emit('error', {
        error,
        message: 'Cannot creacte the sell',
      })
    );
};

export const sell =
  (socket) =>
  async ({ price, amount, stock }) => {
    const sell = new History({
      price,
      amount,
      stock,
      seller: socket.user._id,
      where: 'trans',
    });
    sell
      .save()
      .then((e) => socket.emit('sell', { id: e._id }))
      .catch((error) =>
        socket.emit('error', {
          error,
          message: 'Cannot creacte the sell',
        })
      );
  };

export const watch = (socket) => {
  History.watch().on('changes', (e) => {
    socket.emit('watch', e.toObject());
  });
};
