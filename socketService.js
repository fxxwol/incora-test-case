const socketIO = require('socket.io');

class SocketService {
    constructor(server) {
        this.io = socketIO(server);

        this.io.on('connection', (socket) => {
            console.log('A user connected');
        });
    }

    emit(event, data) {
        this.io.emit(event, data);
    }
}

module.exports = SocketService;
