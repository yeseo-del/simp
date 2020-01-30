import io from 'socket.io-client';

let socket;

let connections = [];
// socket.connect(socket=>{
//     socket.on('disconnect', ()=>console.log('disconnected homie'));
//     socket.on('hey', (msg)=>console.log(msg));
// });
// socket.on('hey', (msg)=>console.log(msg));


export const connect = () => {
    if(connections.length === 0){
        socket = io('http://localhost:3001', { autoConnect: false });
        socket.on('connect', () => { console.log('Connected homie!') });
        socket.on('disconnect', () => { console.log('Disconnected homie!') });
        socket.on('hey', (msg) => { console.log('Got message: ', msg) });
        socket.on('identify', () => {
            const sessionID = window.localStorage.getItem('blacksmith-sessionID');
            const token = window.localStorage.getItem('blacksmith-token');
            if(sessionID && token){
                socket.emit('identity', JSON.stringify({ sessionID, token }));
            }else{
                socket.disconnect();
            }
        });
        socket.on('Authorized', msg => console.log(msg));
        socket.on('initialize', msg => console.log('Received game data: ', msg));
        let connection = socket.open();
        connections.push(connection);
    }else{
        console.log('Already connected!');
    }
}

export const disconnect = () => {
    socket.disconnect();
    connections = [];
}