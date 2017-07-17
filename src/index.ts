import * as http from 'http';
import Application from './server';

let application: Application = new Application();
http
    .createServer(application.handler)
    .listen(8080, () => console.log('Server was started! Listening 8080 port.'));