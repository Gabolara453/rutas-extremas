import Server from './src/server/server.js'
import Dotenv from 'dotenv'

Dotenv.config();
const server = new Server();

server.listen();
