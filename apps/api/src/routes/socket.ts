import socketio from 'socket.io';
import stock from '@another/stock';
import passport from './jwt';

const wrapMidSocketIo = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
const io = new Server();

io.use(wrapMidSocketIo(passport.initialize()));
io.use(wrapMidSocketIo(passport.authenticate(['jwt'])));

io.on('connection', (socket) => {
  stock.watch(socket);
  socket.on('sell', stock.sell(socket));
  socket.on('buy', stock.buy(socket));
});

export default io;
