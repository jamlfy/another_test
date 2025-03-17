import socketio from "socket.io";
import passport from "./jwt";

const wrapMidSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
const io = new Server();

io.use(wrapMidSocketIo(passport.initialize()));
io.use(wrapMidSocketIo(passport.authenticate(['jwt'])));

io.on("connection", (socket) => {
	
});

export default io;