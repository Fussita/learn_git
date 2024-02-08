
import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
/*import { loadData, fechaFormateo, fbApp } from './Firebase/loadData.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(fbApp);
await signInWithEmailAndPassword(auth, 'admin@gmail.com', '123456')    
    .catch(() => { console.log('Error') });
*/
const app = express()
const port = 4000
const server = createServer(app)
const io = new Server( server, {
    cors: { origin: '*' }
}) 

io.on('connection', (socket) => {
    socket.on('chat_message', (data) => {
        io.emit('chat_message', data)
        


    })
})

app.use( logger('dev') )
server.listen(port, () => {
    console.log(' on port', port)
})