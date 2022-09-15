import {io} from 'socket.io-client';
// its returning the instance of socket client 
export const initSocket = async()=>{
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    // REACT_APP_BACKEND_URL -> on which port /url our server.js running
    // In case of react app no need to install .env and we have to just add REACT_APP_prefix 
    return io(process.env.REACT_APP_BACKEND_URL, options);
};